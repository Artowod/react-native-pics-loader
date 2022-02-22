import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

export default function RegistrationScreen() {
  const [isKeybShown, setIsKeybShown] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isReady, setIsReady] = useState(false);

  const loadingApplication = async () => {
    await Font.loadAsync({ Roboto: require("../../assets/fonts/Roboto-Regular.ttf") });
    setIsReady(true);
  };

  /**
   * Returns true if the screen is in portrait mode
   */
  const isPortrait = () => {
    console.log("portrait");
    const dim = Dimensions.get("screen");
    return dim.height >= dim.width;
  };

  /**
   * Returns true of the screen is in landscape mode
   */
  const isLandscape = () => {
    console.log("landscape");
    const dim = Dimensions.get("screen");
    return dim.width >= dim.height;
  };
  // ===========================

  useEffect(() => {
    const showKeyboard = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeybShown(true);
    });
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeybShown(false);
    });
    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  console.log(Platform.OS);

  const submit = (e) => {
    Keyboard.dismiss();
    console.log("Registering...");
    console.log({ login, email, pass });
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadingApplication}
        onFinish={() => {
          setIsReady(true);
        }}
        onError={console.warn}
      />
    );
  }

  return (
    /*     <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setIsKeybShown(false);
      }}
    > */
    <View
      style={{ flex: 1 }}
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();
        setIsKeybShown(false);
      }}
    >
      <ImageBackground style={styles.image} source={require("../../ukraine.jpg")}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keybAvoidingView}>
          <View style={styles.registerWrapper}>
            {!isKeybShown && (
              <View style={styles.registerAvatar}>
                <TouchableOpacity>
                  <Image style={styles.addAvatarBtn} source={require("../../add.png")} />
                </TouchableOpacity>
              </View>
            )}
            <Text style={styles.registerTitle}>Реєстрація</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Логін"
              onFocus={() => setIsKeybShown(true)}
              value={login}
              onChangeText={(value) => setLogin(value)}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              placeholder="Адреса електронної пошти"
              onFocus={() => setIsKeybShown(true)}
              value={email}
              onChangeText={(value) => setEmail(value)}
            ></TextInput>
            <View style={{ marginBottom: 1 }}>
              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                placeholder="Пароль"
                onFocus={() => setIsKeybShown(true)}
                value={pass}
                onChangeText={(value) => setPass(value)}
              ></TextInput>
              <Text style={styles.passwordShow}>Показати</Text>
            </View>
            {!isKeybShown && (
              <View style={{ marginTop: 47 }}>
                <TouchableOpacity style={styles.registerBtn} onPress={submit}>
                  <Text style={styles.registerBtnName}>Зареєструвати</Text>
                </TouchableOpacity>
                <Text style={styles.registerAlreadyHaveAcc}>Вже є акаунт? Війти</Text>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
    /* </TouchableWithoutFeedback> */
  );
}

// <View style={styles.containerBottom}>
//   <TextInput
//     style={{
//       height: 40,
//       borderColor: "blue",
//       borderWidth: 5,
//       color: "yellow",
//       fontSize: 40,
//       paddingVertical: 20,
//       paddingHorizontal: 10,
//     }}
//     defaultValue="Пиши тут "
//   />
//   <StatusBar style="auto" />
// </View>;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",

    borderColor: "yellow",
    borderWidth: 1,
    ...Platform.select({
      ios: {
        justifyContent: "center",
        /* styles for ios only */
      },
      android: {
        justifyContent: "flex-end",
        /* styles for android only */
      },
    }),
  },
  keybAvoidingView: {
    flex: 1,
    ...Platform.select({
      ios: {
        justifyContent: "center",
        /* styles for ios only */
      },
      android: {
        justifyContent: "flex-end",
        /* styles for android only */
      },
    }),
  },

  registerWrapper: {
    flex: 1,
    maxHeight: 549,

    justifyContent: "center",
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        maxHeight: 549,
        borderRadius: 25,
        maxWidth: 375,
        marginLeft: 100,
        alignItems: "center",
        /* styles for ios only */
      },
      android: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        /* styles for android only */
      },
    }),
  },
  registerAvatar: {
    // position: "absolute",
    marginTop: -140,
    marginBottom: 32,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "orange",

    ...Platform.select({
      ios: {
        //alignItems: "center",
        /* styles for ios only */
      },
      android: {
        alignSelf: "center",
        /* styles for android only */
      },
    }),
  },
  addAvatarBtn: {
    width: 25,
    height: 25,
    marginLeft: 107,
    marginTop: 80,

    ...Platform.select({
      ios: {
        //alignItems: "center",
        /* styles for ios only */
      },
      android: {
        /* styles for android only */
      },
    }),
  },
  avatar: {},

  registerTitle: { fontSize: 30, fontWeight: "500", marginBottom: 33, textAlign: "center", fontFamily: "Roboto" },

  textInput: {
    textAlign: "left",
    height: 50,

    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontSize: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        width: 343,
      },
      android: {
        marginHorizontal: 16,
      },
    }),
  },
  passwordShow: { marginTop: -43, marginRight: 16, textAlign: "right", fontSize: 16, color: "#1B4371" },
  registerBtn: {
    height: 50,
    // marginTop: 57,
    borderWidth: 1,
    borderColor: "red",

    paddingHorizontal: 16,
    marginHorizontal: 16,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    ...Platform.select({
      ios: {
        width: 343,
      },
      android: {},
    }),
  },
  registerBtnName: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "white",
  },
  registerAlreadyHaveAcc: { marginTop: 16, fontSize: 16, color: "#1B4371", textAlign: "center" },
});

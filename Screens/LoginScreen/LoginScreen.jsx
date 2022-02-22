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

export default function LoginScreen() {
  const [isKeybShown, setIsKeybShown] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isReady, setIsReady] = useState(false);

  const loadingApplication = async () => {
    await Font.loadAsync({ Roboto: require("../../assets/fonts/Roboto-Regular.ttf") });
    setIsReady(true);
  };

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

  const submit = (e) => {
    Keyboard.dismiss();
    console.log("Registering...");
    console.log({ email, pass });
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
    <View
      style={{ flex: 1 }}
      onStartShouldSetResponder={() => {
        console.log("click on the back");
        Keyboard.dismiss();
        setIsKeybShown(false);
      }}
    >
      <ImageBackground style={styles.image} source={require("../../ukraine.jpg")}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keybAvoidingView}>
          <View style={{ ...styles.loginWrapper, maxHeight: isKeybShown ? 250 : 489 }}>
            <Text style={{ ...styles.loginTitle, marginTop: isKeybShown ? 0 : 53 }}>Ввійти</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Адреса електронної пошти"
              onFocus={() => setIsKeybShown(true)}
              value={email}
              onChangeText={(value) => setEmail(value)}
            ></TextInput>
            <View>
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
                <TouchableOpacity style={styles.loginBtn} onPress={submit}>
                  <Text style={styles.loginBtnName}>Війти</Text>
                </TouchableOpacity>
                <Text style={styles.loginAlreadyHaveAcc}>Немає акаунта? Зареєструватись</Text>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
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

  loginWrapper: {
    flex: 1,

    justifyContent: "center",
    backgroundColor: "white",
    ...Platform.select({
      ios: {
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

  loginTitle: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 22,
    marginTop: 53,
    textAlign: "center",
  },

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
  passwordShow: { marginTop: -43, marginRight: 26, textAlign: "right", fontSize: 16, color: "#1B4371" },
  loginBtn: {
    height: 50,
    marginTop: 30,
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
  loginBtnName: {
    fontSize: 16,
    color: "white",
  },
  loginAlreadyHaveAcc: { marginTop: 16, marginBottom: 125, fontSize: 16, color: "#1B4371", textAlign: "center" },
});

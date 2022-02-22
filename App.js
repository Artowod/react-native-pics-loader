import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";

export default function App() {
  console.log(Platform.OS);
  const isRegistering = false;
  return <>{isRegistering ? <RegistrationScreen /> : <LoginScreen />}</>;
}

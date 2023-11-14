import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import SplashScreen from "./screens/SplashScreen";
import AddName from "./screens/Register/AddName";
import AddEmail from "./screens/Register/AddEmail";
import AddAge from "./screens/Register/AddAge";
import AddPassword from "./screens/Register/AddPassword";
import store from "./redux/store";
import { Provider } from "react-redux";
import SuccessScreen from "./screens/SuccessScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
          <Stack.Screen name="AddName" component={AddName} />
          <Stack.Screen name="AddAge" component={AddAge} />
          <Stack.Screen name="AddEmail" component={AddEmail} />
          <Stack.Screen name="AddPassword" component={AddPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {},
});

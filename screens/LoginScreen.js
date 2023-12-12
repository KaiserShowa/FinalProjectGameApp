import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/userActions";
import { Feather } from "@expo/vector-icons";
import Loader from "../components/Loader";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!email || !password) {
      setError("Invalid email or password");
    } else {
      setError("");
    }
  };

  const dispatch = useDispatch();

  const handleChangeEmail = (event) => {
    setEmail(event);
  };

  const handleChangePass = (event) => {
    setPassword(event);
  };

  const handleSubmit = () => {
    validateForm(); // Check for form validity and set errors if needed
    if (!error) {
      // Proceed only if there are no errors
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        dispatch(login(email, password, navigation));
      }, 3000);
    }
  };

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }
  return (
    <SafeAreaView>
      <AlertNotificationRoot>
        <Loader visible={loading} />
      </AlertNotificationRoot>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.green,
              fontFamily: "Poppins_500Medium",
              marginVertical: Spacing * 3,
            }}
          >
            Hello there!
          </Text>
        </View>

        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontSize: FontSize.small,
            color: "red",
            alignSelf: "center",
            marginVertical: Spacing / 2,
          }}
        >
          {error}
        </Text>
        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <View>
            <TextInput
              value={email}
              name="email"
              onChangeText={handleChangeEmail}
              placeholder="Email"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholderTextColor={Colors.darkText}
              style={[
                {
                  //flex: 1,
                  fontSize: FontSize.small,
                  padding: Spacing * 2,
                  backgroundColor: Colors.lightPrimary,
                  borderRadius: Spacing,
                  marginVertical: Spacing,
                },
                focused && {
                  borderWidth: 3,
                  borderColor: Colors.primary,
                  shadowOffset: { width: 4, height: Spacing },
                  shadowColor: Colors.primary,
                  shadowOpacity: 0.2,
                  shadowRadius: Spacing,
                },
              ]}
            />
            <Feather
              style={{
                position: "absolute",
                top: Spacing * 3,
                right: Spacing * 2,
              }}
              name="mail"
              size={20}
              color={Colors.darkText}
            />
          </View>
          <View>
            <TextInput
              secureTextEntry={!showPassword}
              value={password}
              name="password"
              onChangeText={handleChangePass}
              placeholder="Password"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholderTextColor={Colors.darkText}
              style={[
                {
                  //flex: 1,
                  fontSize: FontSize.small,
                  padding: Spacing * 2,
                  backgroundColor: Colors.lightPrimary,
                  borderRadius: Spacing,
                  marginVertical: Spacing,
                },
                focused && {
                  borderWidth: 3,
                  borderColor: Colors.primary,
                  shadowOffset: { width: 4, height: Spacing },
                  shadowColor: Colors.primary,
                  shadowOpacity: 0.2,
                  shadowRadius: Spacing,
                },
              ]}
            />

            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={{
                position: "absolute",
                top: Spacing * 3,
                right: Spacing * 2,
              }}
            >
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color={Colors.darkText}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: FontSize.small,
              color: Colors.primary,
              alignSelf: "flex-end",
            }}
          >
            Forgot your password ?
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            padding: Spacing * 2,
            backgroundColor: Colors.green,
            marginVertical: Spacing * 3,
            borderRadius: 50,
            shadowColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: Spacing,
            },
            shadowOpacity: 0.3,
            shadowRadius: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterScreen")}
          style={{
            padding: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Create new account
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              color: Colors.primary,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Or continue with
          </Text>

          <View
            style={{
              marginTop: Spacing,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-google"
                color={Colors.text}
                size={Spacing * 2}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-apple"
                color={Colors.text}
                size={Spacing * 2}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-facebook"
                color={Colors.text}
                size={Spacing * 2}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

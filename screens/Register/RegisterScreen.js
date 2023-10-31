import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

import AddName from "./AddName";
import AddEmail from "./AddEmail";
import AddAge from "./AddAge";
import AddPassword from "./AddPassword";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const userDetails = [AddName, AddAge, AddEmail, AddPassword];

const RegisterScreen = () => {
  const [progressBar, setProgressBar] = useState(new Animated.Value(0));
  const progressAnim = progressBar.interpolate({
    inputRange: [0, userDetails.length],
    outputRange: ["0%", "100%"],
  });

  const [isButtonActive, setIsButtonActive] = useState(true);
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [text, setText] = useState("");
  const [visibleBack, setVisibleBack] = useState(false);

  const handleTextChange = (newText) => {
    setText(newText);
    // Enable the button if there is some text
    setIsButtonActive(newText.trim().length === 0);
  };

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }

  const UserDetailsComponent = userDetails[currentComponentIndex];

  const renderNext = () => {
    return isButtonActive ? (
      <TouchableOpacity
        disabled={isButtonActive}
        onPress={handleNext}
        style={{
          padding: Spacing * 2,
          backgroundColor: Colors.gray,
          marginVertical: Spacing * 10,
          borderRadius: Spacing,
          shadowColor: Colors.green,
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
          Continue
        </Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        disabled={isButtonActive}
        onPress={handleNext}
        style={{
          padding: Spacing * 2,
          backgroundColor: Colors.green,
          marginVertical: Spacing * 10,
          borderRadius: Spacing,
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
          Continue
        </Text>
      </TouchableOpacity>
    );
  };

  const renderBack = () => {
    if (currentComponentIndex > 0)
      return (
        <TouchableOpacity
          //disabled={isButtonActive}

          onPress={handleBack}
          style={{
            padding: Spacing,
            backgroundColor: Colors.primary,

            borderRadius: Spacing,
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
            Back
          </Text>
        </TouchableOpacity>
      );
  };

  const handleNext = () => {
    if (currentComponentIndex < userDetails.length - 1) {
      setCurrentComponentIndex(currentComponentIndex + 1);

      setIsButtonActive(true);
    }

    Animated.timing(progressBar, {
      toValue: currentComponentIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const handleBack = () => {
    if (currentComponentIndex > 0) {
      setCurrentComponentIndex(currentComponentIndex - 1);
      setIsButtonActive(true);
    } else {
      navigation.goBack(); // Use navigation to go back to the previous screen
    }

    Animated.timing(progressBar, {
      toValue: currentComponentIndex - 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const renderProgressBar = () => {
    // Implement your progress bar here based on the currentComponentIndex.
    return (
      <View
        style={{
          width: "100%",
          height: 10,
          borderRadius: 20,
          backgroundColor: "#00000020",
        }}
      >
        <Animated.View
          style={[
            {
              height: 10,
              borderRadius: 20,
              backgroundColor: Colors.progressColor,
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  const renderSubmitButton = () => {
    return (
      <TouchableOpacity
        style={{
          padding: Spacing * 2,
          backgroundColor: Colors.primary,
          marginVertical: Spacing * 3,
          borderRadius: Spacing,
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
    );
  };

  const renderSocials = () => {
    return (
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
            marginTop: Spacing * 2,
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
    );
  };

  return (
    <SafeAreaView>
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
              fontFamily: "Poppins_400Regular",
              marginVertical: Spacing * 3,
            }}
          >
            Sign Up
          </Text>
        </View>

        {/* Render progress bar */}
        {renderProgressBar()}

        {/* Render components dynamically */}
        <UserDetailsComponent onTextChange={handleTextChange} />

        {/* Render next button */}
        {renderNext()}

        {renderBack()}

        {/* Render social accounts */}
        {renderSocials()}
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});

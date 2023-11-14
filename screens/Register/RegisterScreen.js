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
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../redux/userActions";

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

const RegisterScreen = ({ navigation }) => {
  const [formCount, setFormCount] = useState(0);
  const formTitles = [
    " What is your name?",
    " How old are you?",
    " What is your email address?",
    " Create a password?",
  ];
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const age = useSelector((state) => state.user.Age);
  const fullname = useSelector((state) => state.user.fullName);

  const [formData, setFormData] = useState({
    fullName: fullname,
    Age: age,
    email: email,
    password: password,
  });

  console.log(formData);

  const handleSubmit = () => {
    const { fullName, Age, email, password } = formData; // Correct the property names here
    dispatch(registerUser(fullName, Age, email, password, navigation));
  };

  const [progressBar, setProgressBar] = useState(new Animated.Value(0));
  const progressAnim = progressBar.interpolate({
    inputRange: [0, formTitles.length],
    outputRange: ["0%", "100%"],
  });

  const [isButtonActive, setIsButtonActive] = useState(false);
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

  const renderTitle = () => {
    return (
      <Text
        style={{
          fontFamily: "Poppins_700Bold",
          color: Colors.darkText,
          textAlign: "center",
          fontSize: FontSize.xLarge,
        }}
      >
        {formTitles[formCount]}
      </Text>
    );
  };

  const renderBack = () => {
    if (formCount > 0)
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

  const formDisplay = () => {
    if (formCount == 0) {
      return <AddName formData={formData} setFormData={setFormData} />;
    } else if (formCount == 1) {
      return <AddAge formData={formData} setFormData={setFormData} />;
    } else if (formCount == 2) {
      return <AddEmail formData={formData} setFormData={setFormData} />;
    } else if (formCount == 3) {
      return <AddPassword formData={formData} setFormData={setFormData} />;
    }
  };

  const handleNext = () => {
    setFormCount(formCount + 1);

    Animated.timing(progressBar, {
      toValue: formCount + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const handleBack = () => {
    if (formCount > 0) {
      setFormCount(formCount - 1);
      //setIsButtonActive(true);
    } else {
      navigation.goBack(); // Use navigation to go back to the previous screen
    }

    Animated.timing(progressBar, {
      toValue: formCount - 1,
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
        onPress={handleSubmit}
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
          submit
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
        ></View>

        {/* Render progress bar */}
        {renderProgressBar()}

        {/* {form title} */}
        {renderTitle()}

        {/* Render components dynamically */}
        {formDisplay()}
        {/* Render next button */}
        {formCount != 4 ? renderNext() : renderSubmitButton()}

        {renderBack()}

        {/* Render social accounts */}
        {renderSocials()}
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});

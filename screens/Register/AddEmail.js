import { StyleSheet, View, Text, TextInput } from "react-native";
import React from "react";
import Spacing from "../../constants/Spacing";
import { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { useSelector, useDispatch } from "react-redux";
import { setEmail } from "../../redux/userSlice";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const AddEmail = ({ formData, setFormData }) => {
  const [mail, setMail] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");

  const dispatchAction = () => {
    dispatch(setEmail(mail));
  };

  useEffect(() => {
    if (!!user.email) {
      setMail(user.email);
    }
  }, []);

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleBlur = () => {
    if (!validateEmail(mail)) {
      setError("Invalid email address");
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
    <View
      style={{
        marginVertical: Spacing * 3,
      }}
    >
      <TextInput
        value={formData.email}
        placeholder="Email address"
        name="email"
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          handleBlur();
        }}
        placeholderTextColor={Colors.darkText}
        onChangeText={(e) => {
          setFormData({ ...formData, email: e });
          setError("");
          //onTextChange(e);
          //dispatchAction;
        }}
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

      {error ? (
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            color: "red",
            fontSize: FontSize.small,
            marginTop: Spacing / 2,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default AddEmail;

const styles = StyleSheet.create({});

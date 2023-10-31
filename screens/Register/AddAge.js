import { StyleSheet, View, Text } from "react-native";
import React from "react";
import Spacing from "../../constants/Spacing";

import AppTextInput from "../../components/TextInput";
import { useState } from "react";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const AddAge = ({ onTextChange }) => {
  const [age, setAge] = useState("");
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
      <Text
        style={{
          fontFamily: "Poppins_700Bold",
          color: Colors.darkText,
          textAlign: "center",
          fontSize: FontSize.xLarge,
        }}
      >
        How old are you?
      </Text>
      <AppTextInput
        onChangeText={(text) => {
          onTextChange(text);
        }}
        value={age}
        onChange={(e) => {
          setAge(e.target.value);
        }}
        name="Age"
        placeholder="Age"
      />
    </View>
  );
};

export default AddAge;

const styles = StyleSheet.create({});

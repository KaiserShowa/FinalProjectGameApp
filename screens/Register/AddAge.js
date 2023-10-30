import { StyleSheet, View } from "react-native";
import React from "react";
import Spacing from "../../constants/Spacing";

import AppTextInput from "../../components/TextInput";
import { useState } from "react";

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

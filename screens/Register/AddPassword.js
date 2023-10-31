import { StyleSheet, View } from "react-native";
import React from "react";
import Spacing from "../../constants/Spacing";
import { useState } from "react";

import AppTextInput from "../../components/TextInput";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const AddPassword = ({ onTextChange }) => {
  const [password, setPassword] = useState("");
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
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        name="password"
        secureTextEntry={true}
        placeholder="Password"
      />
    </View>
  );
};

export default AddPassword;

const styles = StyleSheet.create({});

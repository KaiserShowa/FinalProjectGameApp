import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import { Feather } from "@expo/vector-icons";

const AppTextInput = ({ ...otherProps }) => {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
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
      {...otherProps}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  action: {
    flexDirection: "row",
    //marginTop: 10,
    //borderBottomWidth: 1,
    //borderBottomColor: "#f2f2f2",
    //paddingBottom: 5,
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});

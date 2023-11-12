import { StyleSheet, View, Text, TextInput } from "react-native";
import React from "react";
import Spacing from "../../constants/Spacing";
import { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { useSelector, useDispatch } from "react-redux";
import { setFullname } from "../../redux/userSlice";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const AddName = ({ formData, setFormData }) => {
  const [fname, setFname] = useState("");
  const [focused, setFocused] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const dispatchAction = () => {
    dispatch(setFullname(fname));
  };

  useEffect(() => {
    if (!!user.fullName) {
      setFname(user.fullName);
    }
  }, []);

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
      ></Text>

      <TextInput
        value={formData.fullName}
        placeholder="Full Name"
        name="fullName"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={Colors.darkText}
        onChangeText={(e) => {
          setFormData({ ...formData, fullName: e });
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
    </View>
  );
};

export default AddName;

const styles = StyleSheet.create({});

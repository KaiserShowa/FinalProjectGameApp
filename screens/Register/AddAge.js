import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setAge } from "../../redux/userSlice";
import Spacing from "../../constants/Spacing";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const AddAge = ({ formData, setFormData }) => {
  const [agee, setAgee] = useState(0);
  const [focused, setFocused] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const dispatchAction = () => {
    dispatch(setAge(agee));
  };

  useEffect(() => {
    // If the user's age is available in the Redux store, set it in the component's state
    if (user.Age) {
      setAgee(user.Age);
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
      <TextInput
        value={formData.Age}
        name="Age"
        placeholder="Age"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={Colors.darkText}
        onChangeText={(e) => {
          setFormData({ ...formData, Age: e });
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

export default AddAge;

const styles = StyleSheet.create({});

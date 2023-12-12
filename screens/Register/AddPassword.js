import { StyleSheet, View, Text, TextInput } from "react-native";
import React from "react";
import Spacing from "../../constants/Spacing";
import { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { useSelector, useDispatch } from "react-redux";
import { setPassword } from "../../redux/reducers/userSlice";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const AddPassword = ({ formData, setFormData }) => {
  const [pass, setPass] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [focused, setFocused] = useState(false);

  const dispatchAction = () => {
    dispatch(setPassword(pass));
  };

  useEffect(() => {
    if (!!user.password) {
      setPass(user.password);
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
        value={formData.password}
        secureTextEntry={true}
        placeholder="Password"
        name="password"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={Colors.darkText}
        onChangeText={(e) => {
          setFormData({ ...formData, password: e });
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

export default AddPassword;

const styles = StyleSheet.create({});

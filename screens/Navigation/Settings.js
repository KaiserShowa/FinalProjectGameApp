import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Settings = () => {
  return (
    <View style={styles.contents}>
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  contents: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

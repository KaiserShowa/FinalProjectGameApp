import { StyleSheet, Text, View } from "react-native";
import React from "react";

const RateApp = () => {
  return (
    <View style={styles.contents}>
      <Text>Rate app</Text>
    </View>
  );
};

export default RateApp;

const styles = StyleSheet.create({
  contents: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

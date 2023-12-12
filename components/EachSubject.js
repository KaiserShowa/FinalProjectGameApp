import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

const EachSubject = ({ title, onSelect, isSelected }) => {
  const handlePress = () => {
    onSelect(title);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.item,
        isSelected ? styles.selectedSubject : null,
        pressed ? styles.selectedSubject : null,
      ]}
    >
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{title}</Text>
      </View>
      <View style={styles.circular}></View>
    </Pressable>
  );
};

export default EachSubject;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "green",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
    color: "black",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },

  selectedSubject: {
    borderColor: "green", // Change the background color when selected
  },
});

import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import Home from "./Home";
import Profile from "./Navigation/Profile";
import RateApp from "./Navigation/RateApp";
import Settings from "./Navigation/Settings";
import { SimpleLineIcons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();
const icon = require("../assets/images/photo.jpeg");

const Dashboard = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: 1,
                //backgroundColor: Colors.green,
              }}
            >
              <Image
                source={icon}
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 65,
                  resizeMode: "stretch",
                }}
              />
              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: "#111",
                }}
              >
                Victor Habila
              </Text>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
          width: 250,
        },
        headerStyle: {
          backgroundColor: Colors.green,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerActiveTintColor: Colors.green,
        drawerLabelStyle: {
          color: "#111",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: "Home",
          title: "Home",
          drawerIcon: () => (
            <SimpleLineIcons name="home" size={20} color="#808080" />
          ),
        }}
        component={Home}
      />

      <Drawer.Screen
        name="Profile"
        options={{
          drawerLabel: "Profile",
          title: "Profile",
          drawerIcon: () => (
            <SimpleLineIcons name="user" size={20} color="#808080" />
          ),
        }}
        component={Profile}
      />

      <Drawer.Screen
        name="RateApp"
        options={{
          drawerLabel: "RateApp",
          title: "RateApp",
          drawerIcon: () => (
            <SimpleLineIcons name="star" size={20} color="#808080" />
          ),
        }}
        component={RateApp}
      />

      <Drawer.Screen
        name="Settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
          drawerIcon: () => (
            <SimpleLineIcons name="settings" size={20} color="#808080" />
          ),
        }}
        component={Settings}
      />

      <Drawer.Screen
        name="Logout"
        options={{
          drawerLabel: "Logout",
          title: "Logout",
          drawerIcon: () => (
            <SimpleLineIcons name="logout" size={20} color="#808080" />
          ),
        }}
        component={Settings}
      />
    </Drawer.Navigator>
  );
};

export default Dashboard;

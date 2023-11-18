import React from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LottieView from "lottie-react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const { height } = Dimensions.get("window");

const WelcomeLogin = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* LottieView in a separate container */}
      <View style={StyleSheet.absoluteFill}>
        <LottieView
          source={require("../assets/lottie/Welcome1.json")}
          autoPlay
          loop
        />
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{ paddingHorizontal: Spacing * 4, paddingTop: Spacing * 4 }}
        >
          <Text
            style={{
              fontSize: FontSize.xxLarge,
              color: Colors.green,
              fontFamily: "Poppins_700Bold",
              textAlign: "center",
            }}
          >
            Hurray!!!
          </Text>
          <Text
            style={{
              fontSize: FontSize.large,
              color: Colors.text,
              fontFamily: "Poppins_400Regular",
              textAlign: "center",
              marginTop: Spacing * 2,
            }}
          >
            Lets have some fun...
          </Text>
        </View>
        <View
          style={{ paddingHorizontal: Spacing * 2, paddingTop: Spacing * 45 }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Dashboard")}
            style={{
              backgroundColor: Colors.green,
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 3,
              borderRadius: 50,
              //marginVertical: 400,
              shadowColor: Colors.primary,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_700Bold",
                color: Colors.onPrimary,
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              Continue to home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeLogin;

const styles = StyleSheet.create({});

import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import LottieView from "lottie-react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import EachSubject from "../components/EachSubject";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { fetchAllSubjects } from "../redux/actions/subjectActions";

import { useSelector, useDispatch } from "react-redux";

const { height } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const [ActiveButton, setActiveButton] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSubjects()); // Dispatch action to fetch subjects when component mounts
  }, [dispatch]);

  const subjectList = useSelector((state) => state.subject);
  const { loading, error, subject } = subjectList;

  const handleItemPress = (id) => {
    setSelectedItem(id);
    navigation.navigate("Quiz", { Sub_Id: id });
  };

  console.log(subjectList);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }

  //const { loading, error, products, page, pages } = productList;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* LottieView in a separate container */}

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
        </View>
        <View
          style={{ paddingHorizontal: Spacing * 2, paddingTop: Spacing * 3 }}
        >
          <FlatList
            data={subject}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.item,
                  selectedItem === item.subject_id ? styles.activeItem : null,
                ]}
                onPress={() => handleItemPress(item.subject_id)}
              >
                <EachSubject
                  isSelected={selectedItem === item.subject_id}
                  onSelect={() => handleItemPress(item.subject_id)}
                  title={item.subject_name}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.subject_id.toString()}
          />

          <TouchableOpacity
            disabled={isButtonDisabled}
            onPress={() => navigation.navigate("LoginScreen")}
            style={{
              backgroundColor: ActiveButton
                ? styles.disableColor
                : Colors.green,
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

export default Home;

const styles = StyleSheet.create({
  disableColor: {
    backgroundColor: "#55BCF6",
  },

  itemColor: {
    backgroundColor: "red",
  },
});

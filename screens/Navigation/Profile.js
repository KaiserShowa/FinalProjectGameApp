import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FontSize from "../../constants/FontSize";
import { profilePix } from "../../redux/userSlice";
import { setProfileImage } from "../../redux/userActions";
import Spacing from "../../constants/Spacing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Text,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

const Profile = () => {
  const dispatch = useDispatch();
  const profile_Image = useSelector((state) => state.profileImage);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [DOB, setDOB] = useState("");

  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user !== null) {
          const userData = JSON.parse(user);
          const retrievedFullName =
            userData?.user?.user_metadata?.full_name || "";

          const retrievedEmail = userData?.user?.email || "";
          const retrievedDOB = userData?.user?.user_metadata?.age || "";
          setFullName(retrievedFullName);
          setEmail(retrievedEmail);
          setDOB(retrievedDOB);
        }
      } catch (error) {
        console.error("AsyncStorage retrieval error: ", error);
      }
    };

    retrieveUserData();
  }, []); // Ensure this effect runs only once on mount

  const [profileImage, setProfileImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const avatars = [
    require("../../assets/images/four.jpg"),
    require("../../assets/images/five.jpg"),
    require("../../assets/images/six.jpg"),
    require("../../assets/images/seven.jpg"),
    require("../../assets/images/four.jpg"),
    require("../../assets/images/five.jpg"),
    require("../../assets/images/six.jpg"),
    require("../../assets/images/seven.jpg"),
    require("../../assets/images/seven.jpg"),

    // Add more avatar images as needed
  ];

  const openImagePicker = () => {
    setModalVisible(true);
  };

  const selectAvatar = (avatar) => {
    if (avatar.uri) {
      setProfileImage(avatar);
      dispatch(profilePix(avatar));
      AsyncStorage.setItem("profileImage", avatar.uri);
      setModalVisible(false);
    } else {
      // Handle the case when the selected avatar doesn't have a valid URI
    }
  };

  const pickImage = () => {
    const options = {
      mediaType: "photo",
      quality: 1,
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };
    ImagePicker.launchImageLibraryAsync(options, (response) => {
      if (!response.didCancel) {
        setProfileImage(response.uri);
      }
    });
    setModalVisible(false);
  };

  const pickImageGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        maxWidth: 200,
        maxHeight: 200,
      });

      if (!result.canceled) {
        const { assets } = result;

        if (assets && assets.length > 0) {
          const selectedImage = assets[0]; // Access the first selected image

          const fileName = selectedImage.uri.split("/").pop(); // Extract file name
          const newPath = FileSystem.documentDirectory + fileName;

          setProfileImage({ uri: newPath });

          dispatch(profilePix(fileName));

          await FileSystem.copyAsync({
            from: selectedImage.uri,
            to: newPath,
          });

          // Instead of setting the profileImage directly, you can store the newPath for later use
          // setProfileImage(newPath);

          // Store newPath in AsyncStorage or Redux for persistent use
          // For example:
          await AsyncStorage.setItem("profileImage", selectedImage.uri);
        }
      }
    } catch (error) {
      console.error("Image picking error: ", error);
    }

    setModalVisible(false);
  };

  useEffect(() => {
    const retrieveStoredProfileImage = async () => {
      try {
        const storedImagePath = await AsyncStorage.getItem("profileImage");
        if (storedImagePath) {
          setProfileImage({ uri: storedImagePath }); // Set the image source using { uri: storedImagePath }
        }
      } catch (error) {
        console.error("Error retrieving stored profile image: ", error);
      }
    };

    retrieveStoredProfileImage();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openImagePicker}>
        <Image
          style={styles.profileImage}
          source={profileImage || require("../../assets/images/user_boy.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={styles.saveButtonText}
          name="update"
          size={24}
          color="black"
        >
          Save
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="edit" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.textCont}>
        <Text style={styles.title}>{fullName}</Text>
        <Text style={styles.mail}>{email}</Text>
      </View>

      <TouchableOpacity style={styles.selectImage}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <TextInput
        value={fullName}
        placeholder="Full names"
        name="names"
        placeholderTextColor={Colors.darkText}
        style={[
          {
            //flex: 1,
            fontSize: FontSize.small,
            padding: Spacing * 2,
            width: 300,
            backgroundColor: Colors.lightPrimary,
            borderRadius: Spacing,
            borderWidth: 3,

            borderColor: Colors.grey,
            marginVertical: Spacing,
          },
        ]}
      />

      <TextInput
        value={email}
        placeholder="Email address"
        name="email"
        placeholderTextColor={Colors.darkText}
        style={[
          {
            //flex: 1,
            fontSize: FontSize.small,
            padding: Spacing * 2,
            width: 300,
            backgroundColor: Colors.lightPrimary,
            borderRadius: Spacing,
            borderWidth: 3,

            borderColor: Colors.grey,
            marginVertical: Spacing,
          },
        ]}
      />

      <TextInput
        value={DOB}
        placeholder="Date of birth"
        name="DOB"
        placeholderTextColor={Colors.darkText}
        style={[
          {
            //flex: 1,
            fontSize: FontSize.small,
            padding: Spacing * 2,
            width: 300,
            backgroundColor: Colors.lightPrimary,
            borderRadius: Spacing,
            borderWidth: 3,

            borderColor: Colors.grey,
            marginVertical: Spacing,
          },
        ]}
      />

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeText}>
              {" "}
              <MaterialIcons name="close" size={24} color="black" />
            </Text>
          </TouchableOpacity>
          <FlatList
            data={avatars}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectAvatar(item)}>
                <Image style={styles.avatarImage} source={item} />
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.selectImage}
            onPress={pickImageGallery}
          >
            <Text style={styles.selectText}>Select from Gallery</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    //justifyContent: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0, // Adjust this value to change the position of the modal
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 10,
    zIndex: 1,
  },
  closeText: {
    color: "black",
    fontSize: 18,
  },
  avatarImage: {
    width: 80,
    height: 80,
    margin: 10,
  },
  selectImage: {
    backgroundColor: Colors.green,
    padding: 10,
    borderRadius: 50,
    marginVertical: 20,
  },
  selectText: {
    color: "white",
    fontSize: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },

  logoutText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  textCont: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    position: "absolute",
    top: 80,
    right: 110,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 5,
    zIndex: 1,
  },

  saveButton: {
    position: "absolute",
    top: -50,
    right: 50,
    width: 50,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 5,
    zIndex: 1,
  },

  saveButtonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Profile;

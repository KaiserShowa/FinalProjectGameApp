import {
  setFullname,
  setAge,
  setEmail,
  setPassword,
} from "../reducers/userSlice";
import { supabase } from "../../supabase/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  SET_PROFILE_IMAGE,
} from "../../constants/userConstant";

export const registerUser =
  (fullName, Age, email, password, navigation) => async (dispatch) => {
    //const navigation = useNavigation();
    try {
      // Set user data in the Redux store
      dispatch(setFullname(fullName));
      dispatch(setAge(Age));
      dispatch(setEmail(email));
      dispatch(setPassword(password));

      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
            age: Age,
            profilePix: "no_photo",
          },
        },
      });

      if (error) {
        // Handle registration error
        console.error("Registration error: ", error);
        return {
          success: false,
          message: "User registration failed",
        };
      }

      // User registration successful
      // You can update the user state if needed
      console.log("User registered successfully");
      // alert("Registeration success");
      //navigation.navigate("SuccessScreen");

      return {
        success: true,
        message: "User registered successfully",
      };
    } catch (error) {
      // Handle any other errors that occur during the registration process
      console.error("An error occurred during registration: ", error);
      // Dispatch error actions if necessary
      return {
        success: false,
        message: "An error occurred during registration",
      };
    }
  };

export const login = (email, password, navigation) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    //console.log(data);

    if (error) {
      // Handle login error
      //console.error("Login error: ", error);
      dispatch({ type: USER_LOGIN_FAIL });
      return {
        success: false,
        message: "User Login failed",
      };
    }

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { email: data.email, password: data.password },
    });

    AsyncStorage.setItem("user", JSON.stringify(data))
      .then(() => console.log("Data stored successfully"))
      .catch((error) => console.error("AsyncStorage error: ", error));

    navigation.navigate("WelcomeLogin");

    return {
      success: true,
      message: "User Login successfully",
    };
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL });
    return {
      success: false,
      message: "An error occurred during Login",
    };
  }
};

// Action Creator
export const setProfileImage = (image) => ({
  type: SET_PROFILE_IMAGE,
  payload: image,
});

import { setFullname, setAge, setEmail, setPassword } from "./userSlice";
import { supabase } from "../supabase/supabase";

export const registerUser =
  (fullName, Age, email, password) => async (dispatch) => {
    try {
      // Set user data in the Redux store
      dispatch(setFullname(fullName));
      dispatch(setAge(Age));
      dispatch(setEmail(email));
      dispatch(setPassword(password));

      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        fullName: fullName,
        Age: Age,
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
      console.log("User registered successfully:", user);

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

import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Action to fetch user data asynchronously
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      return JSON.parse(user);
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  userLogin: { userInfo: fetchUserData },
  profileImage: null,
};

const store = configureStore({
  initialState,
  reducer: {
    user: userReducer,
  },
});

export default store;

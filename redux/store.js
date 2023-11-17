import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  userLogin: { userInfo: AsyncStorage.getItem("user") },
};

const store = configureStore({
  initialState,
  reducer: {
    user: userReducer,
  },
});

export default store;

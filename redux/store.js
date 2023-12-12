import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import topicReducer from "./reducers/topicReducer";
import subjectReducer from "./reducers/subjectReducer";
import quizSettingReducer from "./reducers/quizSettingReducer";
import questionReducer from "./reducers/questionReducer";
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
    subject: subjectReducer,
    topic: topicReducer,
    quizSetting: quizSettingReducer,
    question: questionReducer,
  },
});

export default store;

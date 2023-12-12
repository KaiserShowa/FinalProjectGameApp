// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  SET_PROFILE_IMAGE,
} from "../../constants/userConstant";

const userSlice = createSlice({
  name: "user",
  initialState: {
    fullName: "",
    Age: 0,
    email: "",
    password: "",
  },
  reducers: {
    setFullname: (state, action) => {
      state.fullName = action.payload;
    },
    setAge: (state, action) => {
      state.Age = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },

    loginUser: (state = {}, action) => {
      switch (action.type) {
        case USER_LOGIN_REQUEST:
          return { loading: true };
        case USER_LOGIN_SUCCESS:
          return { loading: false, userInfo: action.payload };

        case USER_LOGIN_FAIL:
          return { loading: false, error: action.payload };

        case USER_LOGOUT:
          return {};

        default:
          return state;
      }
    },

    profilePix: (state = initialState, action) => {
      switch (action.type) {
        case SET_PROFILE_IMAGE:
          return {
            ...state,
            profileImage: action.payload,
          };

        default:
          return state;
      }
    },
  },
});

export const {
  setFullname,
  setAge,
  setEmail,
  setPassword,
  loginUser,
  profilePix,
} = userSlice.actions;

export default userSlice.reducer;

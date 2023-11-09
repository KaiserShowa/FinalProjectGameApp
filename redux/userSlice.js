// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { setFullname, setAge, setEmail, setPassword } = userSlice.actions;

export default userSlice.reducer;

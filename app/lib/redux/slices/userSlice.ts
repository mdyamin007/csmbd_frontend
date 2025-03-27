import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { User } from "~/types/data.type";
import type { RootState } from "../store";

interface UserState {
  user: User;
  isAuthenticated: boolean;
}

const initialUserData: User = {
  id: "",
  username: "",
  email: "",
};

// Define the initial state using that type
const initialState: UserState = {
  user: initialUserData,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<User>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
      state.isAuthenticated = true;
    },
    resetUser: (state) => {
      state.user = initialUserData;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const userState = (state: RootState) => state.user;

export default userSlice.reducer;

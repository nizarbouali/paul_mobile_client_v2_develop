import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";

export const key = "auth";

export const initialState: AuthState = {
  login: false,
  signup: false,
  sms_verification: false,
  success: false,
};

const reducers = {
  setShowLoginBottomSheet: (
    state: AuthState,
    action: PayloadAction<boolean>
  ) => {
    state.login = action.payload;
  },
  setShowSignUpBottomSheet: (
    state: AuthState,
    action: PayloadAction<boolean>
  ) => {
    state.signup = action.payload;
  },
  setShowSmsVerificationBottomSheet: (
    state: AuthState,
    action: PayloadAction<boolean>
  ) => {
    state.sms_verification = action.payload;
  },
  setShowSignUpSuccessBottomSheet: (
    state: AuthState,
    action: PayloadAction<boolean>
  ) => {
    state.login = action.payload;
  },
};

export const { reducer, actions } = createSlice({
  name: key,
  initialState,
  reducers,
});

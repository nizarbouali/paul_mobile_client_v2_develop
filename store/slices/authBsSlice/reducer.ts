import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthBsState } from "./types";

export const key = "authbs";

export const initialState: AuthBsState = {
  login: false,
  signup: false,
  sms_verification: false,
  success: false,
};

const reducers = {
  setShowLoginBottomSheet: (
    state: AuthBsState,
    action: PayloadAction<boolean>
  ) => {
    state.login = action.payload;
  },
  setShowSignUpBottomSheet: (
    state: AuthBsState,
    action: PayloadAction<boolean>
  ) => {
    state.signup = action.payload;
  },
  setShowSmsVerificationBottomSheet: (
    state: AuthBsState,
    action: PayloadAction<boolean>
  ) => {
    state.sms_verification = action.payload;
  },
  setShowSignUpSuccessBottomSheet: (
    state: AuthBsState,
    action: PayloadAction<boolean>
  ) => {
    state.success = action.payload;
  },
};

export const { reducer, actions } = createSlice({
  name: key,
  initialState,
  reducers,
});

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";

export const key = "auth";

export const initialState: AuthState = {
  loading: { login: false, register: false, updateProfile: false },
  error: { login: false, register: false, updateProfile: false },
  token: null,
  user: null,
  smsVerificationProps: { phone: "", code: "" },
};

const reducers = {
  resend: (
    state: AuthState,
    action: PayloadAction<{ phone: string; countryCode: string }>
  ) => {
    state.loading = { ...state.loading, login: true };
    state.error = { ...state.error, login: false };
  },

  resendSuccess: (
    state: AuthState,
    action: PayloadAction<{ phone: string; code: string }>
  ) => {
    state.loading = { ...state.loading, login: false };
    state.error = { ...state.error, login: false };
    state.smsVerificationProps = action.payload;
  },

  resendError: (
    state: AuthState,
    { payload: { error } }: PayloadAction<{ error: any }>
  ) => {
    state.loading = { ...state.loading, login: false };
    state.error = { ...state.error, login: error };
  },

  signIn: (
    state: AuthState,
    action: PayloadAction<{ username: string; password: string }>
  ) => {
    state.loading = { ...state.loading, login: true };
    state.error = { ...state.error, login: false };
  },

  signInSuccess: (state: AuthState, action: PayloadAction<any>) => {
    state.loading = { ...state.loading, login: false };
    state.error = { ...state.error, login: false };
    state.user = action.payload;
    state.token = action.payload.token;
  },

  signInError: (
    state: AuthState,
    { payload: { error } }: PayloadAction<{ error: any }>
  ) => {
    state.loading = { ...state.loading, login: false };
    state.error = { ...state.error, login: error };
  },

  persistToken: (
    state: AuthState,
    { payload: { token } }: PayloadAction<{ token: string }>
  ) => {
    state.token = token;
  },

  logout: (state: AuthState, action: PayloadAction<any>) => {
    state.token = null;
    state.user = null;
  },
};

export const { reducer, actions } = createSlice({
  name: key,
  initialState,
  reducers,
});

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OneSignalState } from "./types";

export const key = "oneSignal";

export const initialState: OneSignalState = {
  oneSignalPlayerId: null,
};

const reducers = {
  setOneSignalId: (state: OneSignalState, action: PayloadAction<any>) => {
    state.oneSignalPlayerId = action.payload;
  },
};

export const { reducer, actions } = createSlice({
  name: key,
  initialState,
  reducers,
});

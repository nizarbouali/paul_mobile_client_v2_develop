import { OneSignalState } from "@/store/slices/oneSignalSlice/types";
import { AuthState } from "@/store/slices/authSlice/types";

export interface RootState {
  auth: AuthState;
  oneSignal: OneSignalState;
}

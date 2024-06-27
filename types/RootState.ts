import { OneSignalState } from "@/store/slices/oneSignalSlice/types";
import { AuthState } from "@/store/slices/authSlice/types";
import { AuthBsState } from "@/store/slices/authBsSlice/types";

export interface RootState {
  authbs: AuthBsState;
  auth: AuthState;
  oneSignal: OneSignalState;
}

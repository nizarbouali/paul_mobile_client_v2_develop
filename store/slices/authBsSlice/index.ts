import { initialState, reducer, key, actions } from "./reducer";
import { useInjectReducer } from "redux-injectors";
import { AuthBsState } from "./types";
import { makeSelectors } from "@/store/makeSeletors";

const selectors = makeSelectors<AuthBsState>(key, initialState);

export const useAuthBsSlice = () => {
  useInjectReducer({ key, reducer });
  return { actions, selectors };
};

export default reducer;

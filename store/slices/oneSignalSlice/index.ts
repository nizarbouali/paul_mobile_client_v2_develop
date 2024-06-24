import { initialState, reducer, key, actions } from "./reducer";
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import { makeSelectors } from "../../makeSeletors";
import { OneSignalState } from "./types";

const selectors = makeSelectors<OneSignalState>(key, initialState);

export const useOneSignalSlice = () => {
  useInjectReducer({ key, reducer });
  return { actions, selectors };
};

export default reducer;

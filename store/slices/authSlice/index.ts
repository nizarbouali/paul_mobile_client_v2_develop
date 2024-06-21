import { initialState, reducer, key, actions } from "./reducer";
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import saga from "./saga";
import { makeSelectors } from "../../makeSeletors";
import { AuthState } from "./types";

const selectors = makeSelectors<AuthState>(key, initialState);

export const useAuthSlice = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  return { actions, selectors };
};

export default reducer;

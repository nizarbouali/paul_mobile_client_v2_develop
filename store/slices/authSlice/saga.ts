import { AnyAction } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import { actions } from "./reducer";
import { actions as actionsBs } from "../authBsSlice/reducer";
import request from "@/api/api";
import { loginUrl, resendUrl } from "@/api/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { displayToast } from "@/lib/interactions";

export function* resend({ payload }: AnyAction) {
  try {
    yield call(async () => {
      return await request.post(resendUrl(), payload);
    });
    console.log("resend success", payload);
    yield put(
      actions.resendSuccess({
        phone: payload.phone,
        code: payload.countryCode,
      })
    );
    yield put(actionsBs.setShowLoginBottomSheet(false));
    yield put(actionsBs.setShowSmsVerificationBottomSheet(true));
  } catch (error) {
    console.log(error);
    yield put(actions.signInError({ error }));
    if (error) {
      displayToast(error);
    } else {
      displayToast("Merci de réessayer ultérieurement.");
    }
  }
}

export function* signIn({ payload }: AnyAction) {
  try {
    const { data: response } = yield call(async () => {
      return await request.post(loginUrl(), payload);
    });
    yield put(
      actions.signInSuccess({
        token: response?.token,
        user: response,
      })
    );
    yield put(actionsBs.setShowSmsVerificationBottomSheet(false));
  } catch (error) {
    console.log(error);
    yield put(actions.signInError({ error }));
  }
}

export function* persistToken({ payload: { token } }: AnyAction) {
  try {
    yield call(async () => {
      await AsyncStorage.setItem("authToken", token);
    });
  } catch (error) {
    console.log(error);
  }
}

export function* logout() {
  try {
    yield call(async () => {
      await AsyncStorage.removeItem("authToken");
    });
  } catch (error) {
    console.log(error);
  }
}

export default function* Saga() {
  yield takeLatest(actions.resend, resend);
  yield takeLatest(actions.signIn, signIn);
  yield takeLatest(actions.signInSuccess, persistToken);
  yield takeLatest(actions.persistToken, persistToken);
  yield takeLatest(actions.logout, logout);
}

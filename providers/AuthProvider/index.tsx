"use strict";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { View, Text, BackHandler, TouchableOpacity } from "react-native";
import { useAuthSlice } from "@/store/slices/authSlice";

import AuthBottomSheet from "@/components/authentication/AuthBottomSheet";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Login from "@/components/authentication/Login";
import Success from "@/components/authentication/Success";
import SmsVerification from "@/components/authentication/SmsVerification";
import Signup from "@/components/authentication/Signup";

export const LoginProvider = (props: any) => {
  const dispatch = useDispatch();
  const { actions, selectors } = useAuthSlice();

  const refLoginBSheet = useRef<any>(null);
  const refSignUpBSheet = useRef<any>(null);
  const refSmsBSheet = useRef<any>(null);
  const refSuccessBSheet = useRef<any>(null);

  const login = useSelector(selectors.login);
  const signup = useSelector(selectors.signup);
  const sms_verification = useSelector(selectors.sms_verification);
  const success = useSelector(selectors.success);

  useEffect(() => {
    if (login) {
      refLoginBSheet.current?.expand();
    } else {
      refLoginBSheet.current?.close();
    }
  }, [login]);

  useEffect(() => {
    if (signup) {
      refSignUpBSheet.current?.expand();
    } else {
      refSignUpBSheet.current?.close();
    }
  }, [signup]);

  useEffect(() => {
    if (sms_verification) {
      refSmsBSheet.current?.expand();
    } else {
      refSmsBSheet.current?.close();
    }
  }, [sms_verification]);

  useEffect(() => {
    if (success) {
      refSuccessBSheet.current?.expand();
    } else {
      refSuccessBSheet.current?.close();
    }
  }, [success]);

  //   const handleBackButtonClick = () => {
  //     dispatch(setShowLoginBottomSheet(false));
  //     return true;
  //   };
  //   useEffect(() => {
  //     if (showLoginBottomSheet) {
  //       BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
  //       return () => {
  //         BackHandler.removeEventListener(
  //           "hardwareBackPress",
  //           handleBackButtonClick
  //         );
  //       };
  //     }
  //   }, [showLoginBottomSheet]);

  const [smsVerificationProps, setSMSVerificationProps] = useState({
    code: "",
    phone: "",
  });

  //   console.log("login", login);

  return (
    <View style={{ flex: 1 }}>
      {props.children}

      <AuthBottomSheet
        ref={refSignUpBSheet}
        snapPoints={["100%"]}
        onClose={() => {
          dispatch(actions.setShowSignUpBottomSheet(false));
        }}
        modalContent={
          <>
            <Signup />
          </>
        }
      />
      <AuthBottomSheet
        ref={refLoginBSheet}
        snapPoints={["50%"]}
        onClose={() => {
          // console.log('authScene', authScene);
          dispatch(actions.setShowLoginBottomSheet(false));
        }}
        modalContent={
          <>
            <Login />
          </>
        }
      />
      <AuthBottomSheet
        ref={refSmsBSheet}
        snapPoints={["50%"]}
        onClose={() => {
          // console.log('authScene', authScene);
          dispatch(actions.setShowSmsVerificationBottomSheet(false));
        }}
        modalContent={
          <>
            <SmsVerification />
          </>
        }
      />
      <AuthBottomSheet
        ref={refSuccessBSheet}
        snapPoints={["50%"]}
        onClose={() => {
          // console.log('authScene', authScene);
          dispatch(actions.setShowSignUpSuccessBottomSheet(false));
        }}
        modalContent={
          <>
            <Success />
          </>
        }
      />
    </View>
  );
};

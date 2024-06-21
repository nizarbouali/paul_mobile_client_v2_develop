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

export const LoginProvider = (props: any) => {
  const dispatch = useDispatch();
  const { actions, selectors } = useAuthSlice();

  const refLoginBSheet = useRef<any>(null);
  const refSignUpBSheet = useRef<any>(null);
  const refSmsBSheet = useRef<any>(null);
  const refSuccessBSheet = useRef<any>(null);

  const login = useSelector(selectors.login);

  useEffect(() => {
    console.log("showLoginBottomSheet", login);
    if (login) {
      refLoginBSheet.current?.expand();
    } else {
      refLoginBSheet.current?.close();
    }
  }, [login]);

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
            <Text>SIGNUP</Text>
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
            <Text>SMS_VERIFICATION</Text>
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
            <Text>Signup Success</Text>
          </>
        }
      />
    </View>
  );
};

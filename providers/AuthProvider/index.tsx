"use strict";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { View, Text, BackHandler, TouchableOpacity, Alert } from "react-native";
import { useAuthBsSlice } from "@/store/slices/authBsSlice";

import AuthBottomSheet from "@/components/authentication/AuthBottomSheet";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Login from "@/components/authentication/Login";
import Success from "@/components/authentication/Success";
import SmsVerification from "@/components/authentication/SmsVerification";
import Signup from "@/components/authentication/Signup";
import axios from "axios";
import { useAuthSlice } from "@/store/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import request from "@/api/api";

export const LoginProvider = (props: any) => {
  const dispatch = useDispatch();
  const { actions: actionsBs, selectors: selectorsBs } = useAuthBsSlice();
  const { actions, selectors } = useAuthSlice();

  const refLoginBSheet = useRef<any>(null);
  const refSignUpBSheet = useRef<any>(null);
  const refSmsBSheet = useRef<any>(null);
  const refSuccessBSheet = useRef<any>(null);

  const login = useSelector(selectorsBs.login);
  const signup = useSelector(selectorsBs.signup);
  const sms_verification = useSelector(selectorsBs.sms_verification);
  const success = useSelector(selectorsBs.success);
  let user = {};
  // const token = useSelector(selectors.token);

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          user = request.get("/user/me");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDatas();
  }, []);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

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

  const closer = () => {
    if (login) {
      dispatch(actionsBs.setShowLoginBottomSheet(false));
    } else if (signup) {
      dispatch(actionsBs.setShowSignUpBottomSheet(false));
      dispatch(actionsBs.setShowLoginBottomSheet(true));
    } else if (sms_verification) {
      dispatch(actionsBs.setShowSmsVerificationBottomSheet(false));
      dispatch(actionsBs.setShowSignUpBottomSheet(true));
    } else if (success) {
      dispatch(actionsBs.setShowSignUpSuccessBottomSheet(false));
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", closer);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", closer);
    };
  }, []);

  const onCloseSignUpBs = useCallback(() => {
    dispatch(actionsBs.setShowSignUpBottomSheet(false));
  }, [dispatch]);

  const onCloseLoginBs = useCallback(() => {
    dispatch(actionsBs.setShowLoginBottomSheet(false));
  }, [dispatch]);

  const onCloseSmsVerificationBs = useCallback(() => {
    dispatch(actionsBs.setShowSmsVerificationBottomSheet(false));
  }, [dispatch]);

  const onCloseSignUpSuccessBs = useCallback(() => {
    dispatch(actionsBs.setShowSignUpSuccessBottomSheet(false));
  }, [dispatch]);

  return (
    <View style={{ flex: 1 }}>
      {props.children}

      <AuthBottomSheet
        ref={refSignUpBSheet}
        snapPoints={["100%"]}
        onClose={onCloseSignUpBs}
        modalContent={<Signup />}
      />
      <AuthBottomSheet
        ref={refLoginBSheet}
        snapPoints={["50%"]}
        onClose={onCloseLoginBs}
        modalContent={<Login />}
      />
      <AuthBottomSheet
        ref={refSmsBSheet}
        snapPoints={["50%"]}
        onClose={onCloseSmsVerificationBs}
        modalContent={<SmsVerification />}
      />
      <AuthBottomSheet
        ref={refSuccessBSheet}
        snapPoints={["50%"]}
        onClose={onCloseSignUpSuccessBs}
        modalContent={<Success />}
      />
    </View>
  );
};

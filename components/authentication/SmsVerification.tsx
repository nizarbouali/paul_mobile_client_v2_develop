import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Image,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
// styles
import stylesConstant from "@/constants/styles";
import Colors from "@/constants/Colors";
const { FontFamily, FontSize } = stylesConstant;
// hooks
// import useSingIn from "@/hooks/useSingIn";
// import useResendCode from "@/hooks/useResendCode";

// components
import Header from "@/components/Header";
import { useAuthBsSlice } from "@/store/slices/authBsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuthSlice } from "@/store/slices/authSlice";

// useResendCode;
const SmsVerification = (props: any) => {
  const dispatch = useDispatch();
  const { actions: actionsBs, selectors: selectorsBs } = useAuthBsSlice();
  const { actions, selectors } = useAuthSlice();
  const open = useSelector(selectorsBs.sms_verification);
  const smsProps = useSelector(selectors.smsVerificationProps) as any;

  // References for inputs
  const input_1 = useRef<any>();
  const input_2 = useRef<any>();
  const input_3 = useRef<any>();
  const input_4 = useRef<any>();

  const [state, setState] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    error: false,
  });

  useEffect(() => {
    console.log("smsProps", smsProps);
  }, [smsProps]);

  const [time, setTime] = useState(59);

  const erroeMessage = () => {
    setState({ ...state, pin1: "", pin2: "", pin3: "", pin4: "", error: true });
  };

  // useEffect(() => {
  //   if (newUser) {
  //     console.log('updateAuthScene called in SmsVerification component');
  //     props?.updateAuthScene('SIGNUP');
  //   }
  // }, [newUser]);

  const smsVerification = (pin: any) => {
    const { pin1, pin2, pin3, pin4 } = state;

    const payload = {
      username: smsProps?.code + smsProps?.phone?.replace(/\s/g, ""),
      password: pin?.length === 4 ? pin : pin1 + pin2 + pin3 + (pin4 || pin),
      // oneSignalPlayerId: props?.oneSignalPlayerId || "",
      // fcmToken: props.firebaseToken || "",
    };

    dispatch(actions.signIn(payload));
  };

  useEffect(() => {
    if (time > 0 && open) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (open === false) {
      setTime(59);
    }
  }, [time, open]);

  //   useEffect(() => {
  //     setTimeout(() => {
  //       input_1?.current?.blur();
  //       input_1?.current?.focus();
  //     }, 500);
  //   }, []);

  const phone = props?.phone?.replace(/\s/g, "");

  return (
    <View style={styles.container}>
      <Header
        title="Vérification"
        back={() => {
          dispatch(actionsBs.setShowSmsVerificationBottomSheet(false));
          dispatch(actionsBs.setShowLoginBottomSheet(true));
        }}
      />
      <KeyboardAwareScrollView>
        <Text style={styles.labelInput}>
          Entrez le code que vous avez reçu par
        </Text>
        <Text
          style={{
            fontSize: FontSize.f14,
            fontFamily: FontFamily.poppinsRegular,
            color: "#000",
            textAlign: "center",
          }}
        >
          SMS sur le
        </Text>
        <Text style={styles.phone}>
          {props?.code && props?.phone
            ? "+" + props?.code + (phone.startsWith(0) ? "" : "(0)") + phone
            : ""}
        </Text>
        {state.error && (
          <Text style={styles.codeError}>Le code saisi est incorrecte</Text>
        )}
        <View style={styles.contentContainerner}>
          <View style={styles.inputContainer}>
            <BottomSheetTextInput
              ref={input_1}
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              value={state.pin1}
              onChangeText={(pin) => {
                if (pin?.length === 1 || pin?.length === 0) {
                  setState({ ...state, pin1: pin });
                  if (pin) {
                    input_2.current.focus();
                  }
                } else if (pin?.length === 4) {
                  setState({
                    ...state,
                    pin1: pin?.[0],
                    pin2: pin?.[1],
                    pin3: pin?.[2],
                    pin4: pin?.[3],
                  });
                  Keyboard.dismiss();
                  smsVerification(pin);
                }
              }}
              keyboardType={"number-pad"}
              maxLength={4}
            />
          </View>
          <View style={styles.inputContainer}>
            <BottomSheetTextInput
              ref={input_2}
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              value={state.pin2}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  if (!state.pin2) {
                    input_1.current.focus();
                  }
                }
              }}
              onChangeText={(pin: any) => {
                setState({ ...state, pin2: pin });
                if (pin) {
                  input_3.current.focus();
                }
              }}
              onFocus={() => {
                if (!state.pin1 || state.pin1 === "") {
                  input_1.current.focus();
                }
              }}
              keyboardType={"number-pad"}
              maxLength={1}
            />
          </View>
          <View style={styles.inputContainer}>
            <BottomSheetTextInput
              ref={input_3}
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              value={state.pin3}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  if (!state.pin3) {
                    input_2.current.focus();
                  }
                }
              }}
              onChangeText={(pin) => {
                setState({ ...state, pin3: pin });
                if (pin) {
                  input_4.current.focus();
                }
              }}
              onFocus={() => {
                if (!state.pin2 || state.pin2 === "") {
                  input_2.current.focus();
                }
              }}
              keyboardType={"number-pad"}
              maxLength={1}
            />
          </View>
          <View style={styles.inputContainer}>
            <BottomSheetTextInput
              ref={input_4}
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              value={state.pin4}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  if (!state.pin4) {
                    input_3.current.focus();
                  }
                }
              }}
              onChangeText={(pin) => {
                setState({ ...state, pin4: pin });
                if (pin) {
                  Keyboard.dismiss();

                  smsVerification(pin);
                }
              }}
              onFocus={() => {
                if (!state.pin3 || state.pin3 === "") {
                  input_3.current.focus();
                }
              }}
              keyboardType={"number-pad"}
              maxLength={1}
            />
          </View>
        </View>
        <View style={styles.timeContainer}>
          <Text style={time !== 0 ? styles.disabled : styles.text}>
            {time === 0 ? "00:00" : time > 9 ? "00:" + time : "00:0" + time}
          </Text>
          <TouchableOpacity
            onPress={() => {
              //   resendCode({
              //     countryCode: props?.code,
              //     phone: props?.phone?.replace(/\s/g, ""),
              //   });
              setTime(59);
            }}
            disabled={time !== 0}
            style={styles.renvoyerContainer}
          >
            <View style={time !== 0 ? {} : styles.textContainer}>
              <Text style={time !== 0 ? styles.disabled : styles.text}>
                Je n'ai pas reçu le code
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* {(fetching || fetchingCode) && (
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color="#100A56" />
          </View>
        )} */}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainerner: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inputContainer: {
    width: 52,
    height: 52,
    // backgroundColor: 'white',
    color: "black",
    borderRadius: 9,
    // borderColor: Colors.appColor,
    borderBottomWidth: 2,
    fontWeight: "500",
    justifyContent: "center",
    marginRight: 20,
    zIndex: 1,
  },
  inputContainer1: {
    width: 52,
    height: 52,
    backgroundColor: "white",
    color: "black",
    borderRadius: 9,
    borderColor: Colors.light.appColor,
    borderWidth: 1,
    fontWeight: "500",
    justifyContent: "center",
    marginRight: 20,
    zIndex: -1,
  },
  textInput: {
    textAlign: "center",
    fontSize: FontSize.f18,
    fontFamily: FontFamily.nextMedium,
    color: "#373737",
  },
  textInput1: {
    textAlign: "center",
    fontSize: FontSize.f18,
    fontFamily: FontFamily.nextMedium,
    color: "#373737",
    letterSpacing: Platform.OS === "ios" ? 50 : 10,
  },
  codeText: {
    textAlign: "center",
    fontSize: FontSize.f18,
    fontFamily: FontFamily.nextMedium,
    color: "#373737",
    marginTop: 70,
  },
  labelInput: {
    marginTop: 28,
    fontSize: FontSize.f14,
    fontFamily: FontFamily.poppinsRegular,
    color: "#000",
    textAlign: "center",
    lineHeight: 25,
  },
  phone: {
    marginBottom: 35,
    fontSize: FontSize.f14,
    fontFamily: FontFamily.poppinsMedium,
    color: "#000",
    textAlign: "center",
    lineHeight: 25,
  },
  codeError: {
    marginTop: -15,
    marginBottom: 16,
    fontSize: FontSize.f12,
    fontFamily: FontFamily.poppinsMedium,
    color: Colors.light.errorColor,
    textAlign: "center",
    lineHeight: 25,
  },
  timeContainer: {
    marginTop: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  renvoyerContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 24,
    height: 24,
    alignSelf: "center",
    marginRight: 5,
  },
  textContainer: {
    backgroundColor: "#F3E4CC",
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  text: {
    fontSize: FontSize.f12,
    fontFamily: FontFamily.poppinsMedium,
    color: "#000",
  },
  disabled: {
    fontSize: FontSize.f12,
    fontFamily: FontFamily.poppinsMedium,
    color: Colors.light.thirdColor,
  },
});

export default SmsVerification;

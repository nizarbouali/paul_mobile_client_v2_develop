import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

// hooks
// import useResend from "@/hooks/useResend";

//componens
import Button from "@/components/Button";
import PhoneInput from "@/components/PhoneInput";
// import withOneSignalIdRequest from "@/components/OnesignalRequestId";

import stylesConstant from "@/constants/styles";

const { FontFamily, FontSize } = stylesConstant;

const Login = (props: any) => {
  //refs

  const [state, setState] = useState({
    username: "",
    code: "212",
  });

  // const [{ fetching }, resend] = useResend();

  const AddSpace = () => {
    const regExp = /^0[0-9].*$/;
    let value = !regExp.test(state.username)
      ? state.username
      : state.username?.substring(1);
    let text = [];
    text = value.split("");
    for (let i = 0; i < text.length; i++) {
      if (i % 3 === 0) {
        text.splice(i, 0, i === 0 ? "" : " ");
      }
    }
    return text.join("");
  };

  const login = () => {
    const { username, code } = state;
    const regExp = /^0[0-9].*$/;
    if (!regExp.test(username)) {
      const phone = AddSpace();

      const payload = {
        phone: username,
        countryCode: code,
        oneSignalPlayerId: props.oneSignalPlayerId,
        fcmToken: props.firebaseToken || "",
      };

      // resend(payload, phone, state.code, (data: any) => props?.close(data));
    } else {
      const phone = AddSpace();

      const payload = {
        phone: username.substring(1),
        countryCode: code,
        oneSignalPlayerId: props.oneSignalPlayerId,
        fcmToken: props.firebaseToken || "",
      };

      // resend(payload, phone, state.code, (data: any) => props?.close(data));
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
        resizeMode={"contain"}
      />
      <Text style={styles.loginMessage}>
        Insérer votre numéro de téléphone pour\nrecevoir un code SMS afin de
        vous identifier
      </Text>
      <PhoneInput
        textType=""
        value={state.username}
        ontextChange={(username) => setState({ ...state, username })}
        callingcodechange={(code) => setState({ ...state, code: code })}
        code={state.code}
      />
      <View style={styles.additonalContainerStyle}>
        <Button
          big
          content="Continuer"
          onPress={login}
          // loading={fetching}
          disabled={state.username.length < 9}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    height: 42,
    width: 110.49,
    marginTop: 16,
  },
  login: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: FontSize.f16,
    color: "#000",
    textAlign: "center",
    marginTop: 30.5,
    marginBottom: 37,
    lineHeight: 23,
  },
  loginMessage: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.f14,
    color: "#000",
    textAlign: "center",
    marginTop: 30.5,
    marginBottom: 22,
    lineHeight: 20,
  },
  imgContainer: {
    position: "absolute",
    top: -24,
    left: Platform.OS === "android" ? -41 : -30,
    padding: 7,
  },
  img: {
    height: 22,
    width: 22,
  },
  additonalContainerStyle: {
    paddingVertical: 20,
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    width: "100%",
  },
});

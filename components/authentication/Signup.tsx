import React, { useState, useEffect } from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

// hooks
// import useSignUp from "@/hooks/useSignUp";

//styles
import stylesConstant from "@/constants/styles";
const { FontFamily, FontSize } = stylesConstant;

//lib
// import withOneSignalIdRequest from "@/components/authentication/OnesignalRequestId";

//components
import Input from "@/components/Input";
import Button from "@/components/Button";
import CheckBox from "@/components/CheckBox";
import Header from "@/components/Header";
import PickerMenu from "@/components/PickerMenu";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

// Config
import convertcsv from "@/config/convertcsv.json";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuthSlice } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";

interface Props {
  oneSignalPlayerId?: string;
  firebaseToken?: string;
  backToLogin?: () => void;
}

// interface Payload {
//   email: string;
//   name: { first: string; last: string };
//   oneSignalPlayerId: string;
//   fcmToken: string;
//   civility: string;
//   city: string ;
//   quartier: string;
//   cguAccepted: boolean;
//   newslettersAccepted: boolean;
//   deviceInfo: {
//     uniqueID: string;
//     manufacturer: string;
//     model: string;
//     systemVersion: string;
//   };
//   codeParrain?: string;
// }

const CITIES = convertcsv
  ?.map((i) => ({ label: i?.city, key: i?.city }))
  .filter(
    (value, index, self) => index === self.findIndex((t) => t.key === value.key)
  );

const GENDER: RadioButtonProps[] = [
  { id: "0", value: "mme", label: "Mme" },
  { id: "1", value: "m", label: "M" },
];

const SingUp: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { actions, selectors } = useAuthSlice();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    city: "",
    quartier: "",
    check: false,
    news: true,
    civility: GENDER[0],
    email: "",
    codeParrain: "",
    deviceInfo: {
      uniqueID: "",
      manufacturer: "",
      model: "",
      systemVersion: "",
    },
  });

  const [selectedId, setSelectedId] = useState(0);

  //   useEffect(() => {
  //     (async () => {
  //       const uniqueID =
  //         Platform.OS === "android" ? await DeviceInfo.getAndroidId() : "";
  //       const manufacturer = await DeviceInfo.getManufacturer();
  //       const model = DeviceInfo.getModel();
  //       const systemVersion = DeviceInfo.getSystemVersion();

  //       setState((prevState) => ({
  //         ...prevState,
  //         deviceInfo: {
  //           uniqueID,
  //           manufacturer,
  //           model,
  //           systemVersion,
  //         },
  //       }));
  //     })();
  //   }, []);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      civility: selectedId === 0 ? GENDER[0] : GENDER[1],
    }));
  }, [selectedId]);

  //   const [{ fetching }, signUp] = useSignUp();

  const handleSignUp = () => {
    const {
      email,
      firstName,
      lastName,
      civility,
      news,
      check,
      quartier,
      city,
      deviceInfo,
      codeParrain,
    } = state;

    const payload: any = {
      email,
      name: { first: firstName, last: lastName },
      oneSignalPlayerId: props?.oneSignalPlayerId || "",
      fcmToken: props.firebaseToken || "",
      civility: civility?.value,
      city: city,
      quartier: quartier,
      cguAccepted: check,
      newslettersAccepted: news,
      deviceInfo,
      ...(codeParrain && { codeParrain }),
    };

    // signUp(payload);
  };

  const validateEmail = (email: string): boolean => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  return (
    <BottomSheetScrollView style={styles.container}>
      <Header
        title="Inscription"
        back={() => {
          dispatch(actions.setShowSignUpBottomSheet(false));
          dispatch(actions.setShowLoginBottomSheet(true));
        }}
      />
      <KeyboardAwareScrollView
        style={Platform.OS === "ios" ? styles.container : styles.container1}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputs}>
          <View style={styles.radioContainer}>
            <Text>Civilité *</Text>
            <RadioGroup
              radioButtons={GENDER}
              onPress={(selectedId) => setSelectedId(Number(selectedId))}
              selectedId={selectedId.toString()}
              layout="row"
            />
          </View>
          <Input
            big
            label="Prénom *"
            value={state.firstName}
            onChangeText={(firstName: any) => {
              if (
                /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$/.test(
                  firstName
                ) ||
                firstName === ""
              ) {
                setState({ ...state, firstName });
              }
            }}
          />
          <Input
            big
            label="Nom *"
            value={state.lastName}
            onChangeText={(lastName: any) => {
              if (
                /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$/.test(
                  lastName
                ) ||
                lastName === ""
              ) {
                setState({ ...state, lastName });
              }
            }}
          />
          <PickerMenu
            big
            data={CITIES}
            onChoose={(city: any) => {
              setState({ ...state, city, quartier: "" });
            }}
            placeholder=""
            value={state.city || ""}
            label="Ville *"
          />
          <PickerMenu
            big
            data={convertcsv?.filter((i) => i?.city === state.city)}
            disabled={!state.city}
            onChoose={(quartier: any) => setState({ ...state, quartier })}
            placeholder=""
            value={state.quartier || ""}
            label="Quartier *"
          />
          <Input
            big
            label="Email *"
            value={state.email}
            onChangeText={(email: any) => setState({ ...state, email })}
            keyboardType={"email-address"}
          />
          <Input
            big
            label={"Code de parrainage"}
            value={state.codeParrain}
            autoCapitalize={"characters"}
            onChangeText={(codeParrain: any) =>
              setState({ ...state, codeParrain })
            }
          />
        </View>
        <CheckBox
          onPress={() => setState({ ...state, news: !state.news })}
          check={state.news}
          label={
            <Text style={styles.checkText}>
              J’accepte de recevoir les newsletters.
            </Text>
          }
        />
        <CheckBox
          onPress={() => setState({ ...state, check: !state.check })}
          check={state.check}
          label={
            <Text style={styles.checkText}>
              J’accepte les conditions générales de\nvente
            </Text>
          }
          //   onView={() => Actions.CGView()}
        />
        {Platform.OS === "ios" && (
          <Button
            big
            content="Confirmer l’inscription"
            onPress={handleSignUp}
            // loading={fetching}
            disabled={
              !state.lastName ||
              !state.firstName ||
              !state.city ||
              !state.quartier ||
              !validateEmail(state.email) ||
              !state.check ||
              !state.civility
            }
          />
        )}
      </KeyboardAwareScrollView>
      {Platform.OS === "android" && (
        <View style={styles.buttonContainer}>
          <Button
            big
            content="Confirmer l’inscription"
            onPress={handleSignUp}
            // loading={fetching}
            disabled={
              !state.lastName ||
              !state.firstName ||
              !state.city ||
              !state.quartier ||
              !validateEmail(state.email) ||
              !state.check ||
              !state.civility
            }
          />
        </View>
      )}
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 31,
  },
  container1: {
    flex: 1,
    marginBottom: 100,
    paddingTop: 31,
  },
  inputs: {
    alignItems: "center",
  },
  radioContainer: {
    width: 300,
    marginBottom: 20,
  },
  checkText: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: FontSize.f13,
    color: "#000",
    textDecorationLine: "underline",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    justifyContent: "center",
  },
});

// export default withOneSignalIdRequest(SingUp);
export default SingUp;

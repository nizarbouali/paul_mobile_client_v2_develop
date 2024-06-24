import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import CountryPicker, {
  Country,
  FlagType,
  getAllCountries,
} from "react-native-country-picker-modal";
import stylesConstant from "@/constants/styles";
import Colors from "@/constants/Colors";

const { DeviceWidth, FontFamily, FontSize } = stylesConstant;
interface PhoneInputProps {
  code?: string;
  address?: boolean;
  textType: string;
  value?: string;
  ontextChange: (text: string) => void;
  onKeyPress?: (event: any) => void;
  callingcodechange: (code: string) => void;
}

interface PhoneInputState {
  cca2: any;
  callingcode: string;
  number: string;
  value: string;
}

const PhoneInput: React.FC<PhoneInputProps> = (props) => {
  const [state, setState] = useState<PhoneInputState>({
    cca2: "MA",
    callingcode: "212",
    number: "",
    value: "",
  });

  useEffect(() => {
    const setCountry = async () => {
      try {
        const countries = await getAllCountries();
        const country = countries.find(
          (one: Country) => one.callingCode?.[0] === props.code
        );
        if (country) {
          setState({
            cca2: country.cca2,
            callingcode: country.callingCode[0],
            number: "",
            value: "",
          });
        }
      } catch (e) {
        console.error("Error fetching country data", e);
      }
    };
    if (props.code) {
      setCountry();
    }
  }, [props.code]);

  return (
    <View style={props?.address ? {} : styles.container}>
      <Text style={props?.address ? styles.text1 : styles.text}>
        {props.textType}
      </Text>
      <View
        style={
          props?.address
            ? styles.TextInputContainer1
            : styles.TextInputContainer
        }
      >
        <CountryPicker
          filterProps={{ placeholder: "Chercher un pays" }}
          containerButtonStyle={styles.countryPicker}
          withFilter
          withCallingCode
          withAlphaFilter
          withEmoji={false}
          countryCode={state.cca2}
          translation="fra"
          onSelect={(v: Country) => {
            setState({ ...state, cca2: v.cca2, callingcode: v.callingCode[0] });
            props.callingcodechange(v.callingCode[0]);
          }}
        />
        <Image
          source={require("@/assets/images/smallArrowBottom.png")}
          style={styles.arrow}
          resizeMode="contain"
        />
        <Text style={styles.countryCode}>{`+${state.callingcode}(0)`}</Text>
        <BottomSheetTextInput
          style={styles.textInput}
          value={props?.value}
          onChangeText={(value) => props?.ontextChange(value)}
          maxLength={12}
          returnKeyType="done"
          keyboardType="number-pad"
          onKeyPress={props?.onKeyPress}
        />
      </View>
    </View>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginBottom: 70,
  },
  text: {
    color: Colors.light.black_one,
    fontSize: FontSize.f15,
    marginBottom: 9,
    marginLeft: 15,
  },
  text1: {
    color: "#000",
    fontSize: FontSize.f14,
    fontFamily: FontFamily.poppinsRegular,
    marginBottom: 8,
  },
  TextInputContainer: {
    height: 62,
    width: 300,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    shadowColor: "#000",
    borderColor: Colors.light.appColor,
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  TextInputContainer1: {
    height: 60,
    width: 319,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    shadowColor: "#000",
    borderColor: Colors.light.appColor,
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  textInput: {
    fontSize: FontSize.f14,
    fontFamily: FontFamily.poppinsRegular,
    paddingHorizontal: 12,
    height: 60,
    color: "#000",
    width: 185,
  },
  erroText: {
    color: "red",
    alignSelf: "center",
    width: DeviceWidth * 0.7, // Ensure DeviceWidth is defined somewhere in your code
    textAlign: "center",
  },
  arrow: {
    height: 12,
    width: 12,
    marginLeft: -18,
  },
  countryCode: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.f13,
    color: Colors.light.secondColor,
    marginLeft: 12,
  },
  countryPicker: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 14,
    paddingRight: 12,
    marginTop: 0,
  },
});

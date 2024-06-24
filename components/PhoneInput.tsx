// import React, { useState, useEffect } from "react";
// import { View, Text, Image, StyleSheet } from "react-native";
// import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
// import CountryPicker, {
//   Country,
//   FlagType,
//   getAllCountries,
// } from "react-native-country-picker-modal";

// interface PhoneInputProps {
//   code?: string;
//   address?: boolean;
//   textType: string;
//   value?: string;
//   ontextChange: (text: string) => void;
//   onKeyPress?: (event: any) => void;
//   callingcodechange: (code: string) => void;
// }

// interface PhoneInputState {
//   cca2: any;
//   callingcode: string;
//   number: string;
//   value: string;
// }

// const PhoneInput: React.FC<PhoneInputProps> = (props) => {
//   const [state, setState] = useState<PhoneInputState>({
//     cca2: "MA",
//     callingcode: "212",
//     number: "",
//     value: "",
//   });

//   useEffect(() => {
//     const setCountry = async () => {
//       try {
//         const countries = await getAllCountries();
//         const country = countries.find(
//           (one: Country) => one.callingCode?.[0] === props.code
//         );
//         if (country) {
//           setState({
//             cca2: country.cca2,
//             callingcode: country.callingCode[0],
//             number: "",
//             value: "",
//           });
//         }
//       } catch (e) {
//         console.error("Error fetching country data", e);
//       }
//     };
//     if (props.code) {
//       setCountry();
//     }
//   }, [props.code]);

//   return (
//     <View style={props?.address ? {} : styles.container}>
//       <Text style={props?.address ? styles.text1 : styles.text}>
//         {props.textType}
//       </Text>
//       <View
//         style={
//           props?.address
//             ? styles.TextInputContainer1
//             : styles.TextInputContainer
//         }
//       >
//         <CountryPicker
//           filterProps={{ placeholder: "Chercher un pays" }}
//           containerButtonStyle={styles.countryPicker}
//           withFilter
//           withCallingCode
//           withAlphaFilter
//           withEmoji={false}
//           countryCode={state.cca2}
//           translation="fra"
//           onSelect={(v: Country) => {
//             setState({ ...state, cca2: v.cca2, callingcode: v.callingCode[0] });
//             props.callingcodechange(v.callingCode[0]);
//           }}
//         />
//         <Image
//           source={require("@/assets/images/smallArrowBottom.png")}
//           style={styles.arrow}
//           resizeMode="contain"
//         />
//         <Text style={styles.countryCode}>{`+${state.callingcode}(0)`}</Text>
//         <BottomSheetTextInput
//           style={styles.textInput}
//           value={props?.value}
//           onChangeText={(value) => props?.ontextChange(value)}
//           maxLength={12}
//           returnKeyType="done"
//           keyboardType="number-pad"
//           onKeyPress={props?.onKeyPress}
//         />
//       </View>
//     </View>
//   );
// };

// export default PhoneInput;

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   text1: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   TextInputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     margin: 10,
//   },
//   TextInputContainer1: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     margin: 10,
//     padding: 10,
//   },
//   countryPicker: {
//     width: 100,
//   },
//   arrow: {
//     width: 20,
//     height: 20,
//   },
//   countryCode: {
//     fontSize: 16,
//     marginHorizontal: 5,
//   },
//   textInput: {
//     flex: 1,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     marginLeft: 10,
//     fontSize: 16,
//     padding: 5,
//   },
// });

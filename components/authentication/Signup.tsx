// import React, {useState, useEffect} from 'react';
// import {View, Text, Platform} from 'react-native';
// import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
// import DeviceInfo from 'react-native-device-info';

// // hooks
// import useSignUp from '@/hooks/useSignUp';

// //styles
// import stylesConstant from "@/constants/styles";
// const { FontFamily, FontSize } = stylesConstant;

// //lib
// import withOneSignalIdRequest from '@/components/authentication/OnesignalRequestId';

// //components
// import Input from '@/components/Input';
// import Button from '@/components/Button';
// import CheckBox from '@/components/checkBox';
// import Header from '@/components/Header';
// import PickerMenu from '@/components/PickerMenu';
// import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';

// // Config
// import convertcsv from 'config/convertcsv';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import { ScaledSheet } from 'react-native-size-matters';

// interface Props {
//   oneSignalPlayerId?: string;
//   firebaseToken?: string;
//   backToLogin?: () => void;
// }

// interface State {
//   firstName: string;
//   lastName: string;
//   city: {label: string, key: string} | string;
//   quartier: {label: string, key: string} | string;
//   check: boolean;
//   news: boolean;
//   civility: {id: number, value: string, label: string};
//   email: string;
//   codeParrain: string;
//   deviceInfo: {
//     uniqueID: string,
//     manufacturer: string,
//     model: string,
//     systemVersion: string,
//   };
// }

// interface Payload {
//   email: string;
//   name: {first: string, last: string};
//   oneSignalPlayerId: string;
//   fcmToken: string;
//   civility: string;
//   city: string;
//   quartier: string;
//   cguAccepted: boolean;
//   newslettersAccepted: boolean;
//   deviceInfo: {
//     uniqueID: string,
//     manufacturer: string,
//     model: string,
//     systemVersion: string,
//   };
//   codeParrain?: string;
// }

// const CITIES = convertcsv
//   ?.map((i) => ({label: i?.city, key: i?.city}))
//   .filter(
//     (value, index, self) =>
//       index === self.findIndex((t) => t.key === value.key),
//   );

// const GENDER: RadioButtonProps[] = [
//   {id: '0', value: 'mme', label: 'Mme'},
//   {id: '1', value: 'm', label: 'M'},
// ];

// const SingUp: React.FC<Props> = (props) => {
//   const [state, setState] =
//     useState <
//     State >
//     {
//       firstName: '',
//       lastName: '',
//       city: '',
//       quartier: '',
//       check: false,
//       news: true,
//       civility: GENDER[0],
//       email: '',
//       codeParrain: '',
//       deviceInfo: {
//         uniqueID: '',
//         manufacturer: '',
//         model: '',
//         systemVersion: '',
//       },
//     };

//   const [selectedId, setSelectedId] = useState < number > 0;

//   useEffect(() => {
//     (async () => {
//       const uniqueID =
//         Platform.OS === 'android' ? await DeviceInfo.getAndroidId() : '';
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

//   useEffect(() => {
//     setState((prevState) => ({
//       ...prevState,
//       civility: selectedId === 0 ? GENDER[0] : GENDER[1],
//     }));
//   }, [selectedId]);

//   const [{fetching}, signUp] = useSignUp();

//   const singUp = () => {
//     const {
//       email,
//       firstName,
//       lastName,
//       civility,
//       news,
//       check,
//       quartier,
//       city,
//       deviceInfo,
//       codeParrain,
//     } = state;

//     const payload: Payload = {
//       email,
//       name: {first: firstName, last: lastName},
//       oneSignalPlayerId: props?.oneSignalPlayerId || '',
//       fcmToken: props.firebaseToken || '',
//       civility: civility?.value,
//       city: typeof city === 'string' ? city : city?.label,
//       quartier: typeof quartier === 'string' ? quartier : quartier?.label,
//       cguAccepted: check,
//       newslettersAccepted: news,
//       deviceInfo,
//       ...(codeParrain && {codeParrain}),
//     };

//     signUp(payload);
//   };

//   const validateEmail = (email: string): boolean => {
//     const re =
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email);
//   };

//   return (
//     <BottomSheetScrollView style={styles.container}>
//       <Header
//         title={strings.singUp}
//         back={() => {
//           if (props.backToLogin) props.backToLogin();
//         }}
//       />
//       <KeyboardAwareScrollView
//         style={Platform.OS === 'ios' ? styles.container : styles.container1}
//         showsVerticalScrollIndicator={false}>
//         <View style={styles.inputs}>
//           <View style={styles.radioContainer}>
//             <Text style={styles.label}>{strings.civility}</Text>
//             <RadioGroup
//               radioButtons={GENDER}
//               onPress={(selectedId) => setSelectedId(Number(selectedId))}
//               selectedId={selectedId}
//               layout="row"
//               activeButtonId={selectedId}
//             />
//           </View>
//           <Input
//             big
//             label={strings.firstName}
//             value={state.firstName}
//             onChangeText={(firstName) => {
//               if (
//                 /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$/.test(
//                   firstName,
//                 ) ||
//                 firstName === ''
//               ) {
//                 setState({...state, firstName});
//               }
//             }}
//           />
//           <Input
//             big
//             label={strings.lastName}
//             value={state.lastName}
//             onChangeText={(lastName) => {
//               if (
//                 /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$/.test(
//                   lastName,
//                 ) ||
//                 lastName === ''
//               ) {
//                 setState({...state, lastName});
//               }
//             }}
//           />
//           <PickerMenu
//             big
//             data={CITIES}
//             onChoose={(city) => {
//               setState({...state, city, quartier: ''});
//             }}
//             placeholder=""
//             value={
//               typeof state.city === 'string'
//                 ? state.city
//                 : state.city?.label || ''
//             }
//             label={strings.city}
//           />
//           <PickerMenu
//             big
//             data={convertcsv?.filter(
//               (i) =>
//                 i?.city ===
//                 (typeof state.city === 'string'
//                   ? state.city
//                   : state.city?.label),
//             )}
//             disabled={!state.city}
//             onChoose={(quartier) => setState({...state, quartier})}
//             placeholder=""
//             value={
//               typeof state.quartier === 'string'
//                 ? state.quartier
//                 : state.quartier?.label || ''
//             }
//             label={strings.quartier}
//           />
//           <Input
//             big
//             label={strings.email}
//             value={state.email}
//             onChangeText={(email) => setState({...state, email})}
//             keyboardType={'email-address'}
//           />
//           <Input
//             big
//             label={'Code de parrainage'}
//             value={state.codeParrain}
//             autoCapitalize={'characters'}
//             onChangeText={(codeParrain) => setState({...state, codeParrain})}
//           />
//         </View>
//         <CheckBox
//           onPress={() => setState({...state, news: !state.news})}
//           check={state.news}
//           label={<Text style={styles.checkText}>{strings.news}</Text>}
//         />
//         <CheckBox
//           onPress={() => setState({...state, check: !state.check})}
//           check={state.check}
//           label={<Text style={styles.checkText}>{strings.check}</Text>}
//         //   onView={() => Actions.CGView()}
//         />
//         {Platform.OS === 'ios' && (
//           <Button
//             big
//             content={strings.singUpConfirmer}
//             onPress={singUp}
//             loading={fetching}
//             disabled={
//               !state.lastName ||
//               !state.firstName ||
//               !state.city ||
//               !state.quartier ||
//               !validateEmail(state.email) ||
//               !state.check ||
//               !state.civility
//             }
//           />
//         )}
//       </KeyboardAwareScrollView>
//       {Platform.OS === 'android' && (
//         <View style={styles.buttonContainer}>
//           <Button
//             big
//             content={strings.singUpConfirmer}
//             onPress={singUp}
//             loading={fetching}
//             disabled={
//               !state.lastName ||
//               !state.firstName ||
//               !state.city ||
//               !state.quartier ||
//               !validateEmail(state.email) ||
//               !state.check ||
//               !state.civility
//             }
//           />
//         </View>
//       )}
//     </BottomSheetScrollView>
//   );
// };

// const styles = ScaledSheet.create({
//     container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: '31@vs',
//   },
//   container1: {
//     flex: 1,
//     marginBottom: '100@vs',
//     paddingTop: '31@vs',
//   },
//   inputs: {
//     alignItems: 'center',
//   },
//   radioContainer: {
//     width: '300@s',
//     marginBottom: '20@vs',
//   },
//   checkText: {
//     fontFamily: FontFamily.poppinsSemiBold,
//     fontSize: FontSize.f13,
//     color: '#000',
//     textDecorationLine: 'underline',
//   },
//   // buttonContainer: {
//   //   justifyContent: 'flex-end',
//   //   marginBottom: '20@vs',
//   // },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: '20@vs',
//     width: '100%',
//     justifyContent: 'center',
//   },
// })

// export default withOneSignalIdRequest(SingUp);

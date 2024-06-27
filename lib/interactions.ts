/**
 * Copyright (c) Flexi Apps.
 *
 * Functions to display interactions toast
 */

//TODO : use Toast from native base

import { ToastAndroid, Alert, Platform } from "react-native";

import storage from "@/lib/storage";

export const displayToast = (msg: any) => {
  if (Platform.OS === "android") {
    ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  } else {
    Alert.alert("", msg, [{ text: "OK", onPress: () => {} }]);
  }
};

// export const displaySessionToast = ({ navigation }: any) => {
//   Alert.alert(
//     "",
//     [
//       {
//         text: "OK",
//         onPress: () => {
//           storage
//             .clearSession()
//             .then(() => navigation.navigate("Login"))
//             .catch(() => navigation.navigate("Login"));
//         },
//       },
//     ],
//     {
//       cancelable: false,
//     }
//   );
// };

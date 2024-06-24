// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import OneSignal from "react-native-onesignal";

// // api
// import Api from "@/api/api";

// // endpoints
// import { singUpUrl } from "../api/endpoints";

// //lib
// import { emitGoogleAnalyticsEvent, emitFbCustomEvent } from "@/lib/helpers";

// const useSingUp = (): [{ fetching: boolean }, (payload: any) => void] => {
//   const dispatch = useDispatch();

//   const [fetching, setFetching] = useState(false);

//   const singUp = (paylaod: any) => {
//     setFetching(true);

//     Api()
//       .post(singUpUrl(), paylaod)
//       .then(async (data: any) => {
//         // OneSignal.setExternalUserId(data?.id);

//         // Emit custom Facebook Event
//         emitFbCustomEvent("created_account", {
//           phone: data?.phone || "",
//         });

//         // Emit Google Analytics Event
//         emitGoogleAnalyticsEvent("sign_up", {
//           method: data?.phone || "",
//         });

//         // dispatch(setCurrentUser(data));
//         // dispatch(setAuthScene('SUCCESS'));
//         // Actions.reset('FirstView');
//       })
//       .catch((e) => {
//         if (e?.message) {
//           return e?.message;
//         } else {
//           return "Merci de réessayer ultérieurement.";
//         }
//       })
//       .finally(() => {
//         setFetching(false);
//       });
//   };

//   return [{ fetching }, singUp];
// };

// export default useSingUp;

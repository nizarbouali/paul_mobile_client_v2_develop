// import { useState } from "react";
// // import OneSignal from 'react-native-onesignal';

// import Api from "@/api/api";

// // endpoints
// import { resendUrl } from "@/api/endpoints";

// interface Payload {
//   // Define the structure of the payload here
//   // For example:
//   // key: string;
//   // anotherKey: number;
// }

// type Callback = (response: { phone: string; data: any; code: string }) => void;

// const useResend = (): [
//   { fetching: boolean },
//   (payload: Payload, phone: string, code: string, cb?: Callback) => void
// ] => {
//   const [fetching, setFetching] = useState<boolean>(false);

//   const resend = (
//     payload: Payload,
//     phone: string,
//     code: string,
//     cb?: Callback
//   ) => {
//     setFetching(true);
//     Api()
//       .post(resendUrl(), payload)
//       .then((data: any) => {
//         cb && cb({ phone, data, code });
//       })
//       .catch((e: { message?: string }) => {
//         if (e?.message) {
//           return e.message;
//         } else {
//           return "Merci de réessayer ultérieurement.";
//         }
//       })
//       .finally(() => {
//         setFetching(false);
//       });
//   };

//   return [{ fetching }, resend];
// };

// export default useResend;

// import {useState} from 'react';

// // error handler
// import {displayToast} from 'lib/interactions';

// // api
// import {Api} from 'api';

// // endpoints
// import {resendUrl} from '../api/endpoints';

// const useResendCode = () => {
//   const [fetchingCode, setFetching] = useState(false);

//   const resendCode = (paylaod, cb) => {
//     setFetching(true);
//     Api()
//       .post(resendUrl(), paylaod)
//       .then((data) => {
//         cb && cb(data?.code);
//       })
//       .catch((e) => {
//         if (e?.target) {
//           cb && cb(e?.code);
//         } else {
//           if (e?.message) {
//             displayToast(e?.message);
//           } else {
//             displayToast('Merci de réessayer ultérieurement.');
//           }
//         }
//       })
//       .finally(() => {
//         setFetching(false);
//       });
//   };

//   return [{fetchingCode}, resendCode];
// };

// export default useResendCode;

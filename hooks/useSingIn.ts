// import {useState, useEffect} from 'react';
// import {useDispatch} from 'react-redux';
// import OneSignal from 'react-native-onesignal';

// // lib
// import {displayToast} from '@/lib/interactions';
// import {emitGoogleAnalyticsEvent} from '@/lib/helpers';

// // api
// import Api from 'api';

// // actions
// //import {setCurrentUser} from '../actions';
// import {setCurrentUser, setShowLoginBottomSheet, setAuthScene} from 'actions';

// // endpoints
// import {loginUrl} from '../api/endpoints';

// import {Actions} from 'react-native-router-flux';
// import storage from '../../../lib/storage';

// const useSingIn = () => {
//   const [fetching, setFetching] = useState(false);

//   const dispatch = useDispatch();

//   const singIn = (paylaod, cb, code, phone, updateAuthScene) => {
//     setFetching(true);
//     Api()
//       .post(loginUrl(), paylaod)
//       .then(async (data) => {
//         OneSignal.setExternalUserId(data?._id);
//         await storage.setToken(data?.token);

//         if (data?.name?.first && data?.email) {
//           // Emit Google Analytics Event
//           emitGoogleAnalyticsEvent('login', {method: phone});

//           dispatch(setCurrentUser(data));
//           cb(true);
//           Actions.reset('MAIN_TAB_NAV');
//         } else {
//           cb(true);
//           // dispatch(setShowLoginBottomSheet(false));
//           dispatch(setAuthScene('SIGNUP'));
//           // dispatch(setShowLoginBottomSheet(true));
//         }
//       })
//       .catch((e) => {
//         cb && cb(false);
//         if (e?.message) {
//           displayToast(e?.message);
//         } else {
//           displayToast('Merci de réessayer ultérieurement.');
//         }
//       })
//       .finally(() => {
//         setFetching(false);
//       });
//   };

//   return [{fetching}, singIn];
// };

// export default useSingIn;

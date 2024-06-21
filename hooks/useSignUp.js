import {useState} from 'react';
import {Actions} from 'react-native-router-flux';
import {useDispatch} from 'react-redux';
import OneSignal from 'react-native-onesignal';

// error handler
import {displayToast} from 'lib/interactions';

// api
import {Api} from 'api';

// endpoints
import {singUpUrl} from '../api/endpoints';

// actions
import {setCurrentUser} from '../actions';
import {setAuthScene} from 'actions';

//lib
import {emitGoogleAnalyticsEvent, emitFbCustomEvent} from 'lib/helpers';

const useSingUp = () => {
  const dispatch = useDispatch();

  const [fetching, setFetching] = useState(false);

  const singUp = (paylaod) => {
    setFetching(true);

    Api()
      .post(singUpUrl(), paylaod)
      .then(async (data) => {
        OneSignal.setExternalUserId(data?.id);

        // Emit custom Facebook Event
        emitFbCustomEvent('created_account', {
          phone: data?.phone || '',
        });

        // Emit Google Analytics Event
        emitGoogleAnalyticsEvent('sign_up', {
          method: data?.phone || '',
        });

        dispatch(setCurrentUser(data));
        dispatch(setAuthScene('SUCCESS'));
        // Actions.reset('FirstView');
      })
      .catch((e) => {
        if (e?.message) {
          displayToast(e?.message);
        } else {
          displayToast('Merci de réessayer ultérieurement.');
        }
      })
      .finally(() => {
        setFetching(false);
      });
  };

  return [{fetching}, singUp];
};

export default useSingUp;

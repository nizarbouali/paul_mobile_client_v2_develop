import analytics from '@react-native-firebase/analytics';
import {AppEventsLogger, AEMReporterIOS} from 'react-native-fbsdk-next';

/**
 * Send Custom events to: Google Analytics
 * @param {*} eventName
 * @param {*} eventData
 */
export const emitGoogleAnalyticsEvent = async (eventName, eventData) => {
  console.log('DEBUG_EMIT', eventName, eventData);

  try {
    await analytics().logEvent(eventName, eventData);
  } catch (e) {}
};

/**
 * Send Custom events to: FB
 * @param {*} eventName
 * @param {*} eventData
 */
export const emitFbCustomEvent = async (eventName, eventData) => {
  try {
    AppEventsLogger.logEvent(eventName, eventData);
    AEMReporterIOS.logAEMEvent(eventName, 0, '', eventData);
  } catch (e) {}
};

/**
 * Emit Facebook Standard Event
 * work only with android (in this version)
 * @param {*} eventName
 * @param {*} eventData
 */
export const emitFbStandardEvent = async (eventName, eventData) => {
  try {
    //FB Supported standard events
    // const fbStadardEvents = [
    //   'AchievedLevel',
    //   'AdClick',
    //   'AdImpression',
    //   'AddedPaymentInfo',
    //   'AddedToCart',
    //   'AddedToWishlist',
    //   'CompletedRegistration',
    //   'CompletedTutorial',
    //   'Contact',
    //   'CustomizeProduct',
    //   'Donate',
    //   'FindLocation',
    //   'InitiatedCheckout',
    //   'Purchased',
    //   'Rated',
    //   'Searched',
    //   'SpentCredits',
    //   'Schedule',
    //   'StartTrial',
    //   'SubmitApplication',
    //   'Subscribe',
    //   'UnlockedAchievement',
    //   'ViewedContent',
    // ];

    // if (fbStadardEvents.indexOf(eventName) === -1) {
    // }

    switch (eventName) {
      case 'Purchased':
        AppEventsLogger.logPurchase(eventData?.total_ttc, 'MAD', {
          param: 'value',
        });
        AEMReporterIOS.logAEMEvent(
          'fb_mobile_purchase',
          eventData?.total_ttc,
          'MAD',
          {
            param: 'value',
          },
        );
        break;

      default:
        break;
    }
  } catch (e) {}
};

export const substring = (text, max) => {
  return text?.length > max ? text.substring(0, max) + '...' : text;
};

export const formattedPrice = (price) => {
  try {
    return price ? `${price.toFixed(2)}`.replace('.', ',') : '';
  } catch (error) {
    return price;
  }
};

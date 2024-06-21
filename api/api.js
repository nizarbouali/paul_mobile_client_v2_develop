'use strict';
import {Platform} from 'react-native';
import CookieManager from 'react-native-cookies';
import CONFIG from 'config/api';
import storage from 'lib/storage';
import {versionOS} from 'config/appConfig';

import abortController from 'lib/abortController';

// public urls
import {loginUrl} from 'modules/Auth/api/endpoints';
import {Actions} from 'react-native-router-flux';
import {cleanState} from 'actions';
import configureStore from '../store';
import {clearOrder} from '../modules/Order/actions';

const {API_BASE_URL, API_VERSION} = CONFIG;
const baseURL = `${API_BASE_URL}${API_VERSION}`;

const publicUrls = [`${baseURL}${loginUrl()}`];

const {store} = configureStore(Api);

const Api = () => {
  const core = (url, method, data, isForm) => {
    const promise = new Promise((resolve, reject) => {
      return storage.getToken().then(async (token) => {
        // configure request body
        const body = isForm ? data : JSON.stringify(data);

        let authHeader = {
          'x-from': 'mobile',
          'x-method': method,
          'x-url': url,
          'x-app-version': versionOS,
          'x-platform': Platform.OS,
        };

        if (token) {
          authHeader = {
            ...authHeader,
            Authorization: `Bearer ${token}`,
          };
        } else {
          const cookie = await storage.getSession();

          authHeader = {
            ...authHeader,
            cookie,
          };
        }

        const headers = isForm
          ? authHeader
          : {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              ...authHeader,
            };

        /**
         * Send undefined cookie
         * to receive the newest (login)
         */
        if (url === publicUrls[0]) {
          headers.cookie = undefined;
          headers.token = undefined;
        }

        let fetchParams = {
          method,
          headers,
          body,
          credentials: 'include',
        };

        // Clearing all cookies stored by native cookie managers.
        return CookieManager.clearAll().then(() => {
          return fetch(url, fetchParams)
            .then(async (response) => {
              if (url === publicUrls[0]) {
                await storage.setSession('');
                await storage.setToken('');
              }

              const ckie = response.headers.get('set-cookie');

              /**
               * Erease existing cookie
               */
              if (response.status >= 200 && response.status < 300) {
                if (ckie && url === publicUrls[0]) {
                  await storage.setSession(ckie);
                }

                resolve(response);
              } else if (
                response.status === 401 &&
                Actions.currentScene !== 'FirstView' &&
                !url?.includes('/auth/users/resend') &&
                !url?.includes('/user/orders/?$') &&
                !url?.includes('/users/me/location') &&
                !url?.includes('/auth/users/signin')
              ) {
                const result = await response?.json();

                // CLEAR Storage
                storage
                  .clearAllItems()
                  .then(async () => {
                    // CLEAR Store
                    await store.dispatch(cleanState());
                    await store.dispatch(clearOrder());

                    Actions.reset('FirstView', {sessionExpire: true});

                    reject({...result, sessionExpire: true});
                  })
                  .catch((e) => {
                    console.log('error ===> ', e);
                  });
              } else {
                response
                  .json()
                  .then((result) => {
                    reject(result);
                  })
                  .catch((e) => {
                    reject(null);
                  });
              }
            })
            .catch((err) => {
              if (err.name === 'AbortError') {
                reject(new Error('Response timed out'));
              } else {
                reject(err);
              }
            });
        });
      });
    });

    return promise;
  };

  return {
    get: (path, payload) => {
      const promise = new Promise((resolve, reject) => {
        const url = `${baseURL}${path}`;
        core(url, 'GET', payload)
          .then((reponse) => reponse.json())
          .then((data) => {
            resolve(data);
          })
          .catch(async (error) => {
            reject(error);
          });
      });
      return promise;
    },
    post: (path, payload, isForm) => {
      const promise = new Promise((resolve, reject) => {
        const url = `${baseURL}${path}`;

        core(url, 'POST', payload, isForm)
          .then((reponse) => reponse.json())
          .then((data) => {
            resolve(data);
          })
          .catch(async (error) => {
            reject(error);
          });
      });
      return promise;
    },
    put: (path, payload) => {
      const promise = new Promise((resolve, reject) => {
        const url = `${baseURL}${path}`;
        core(url, 'PUT', payload)
          .then((reponse) => reponse.json())
          .then((data) => {
            resolve(data);
          })
          .catch(async (error) => {
            reject(error);
          });
      });
      return promise;
    },
    delete: (path) => {
      const promise = new Promise((resolve, reject) => {
        const url = `${baseURL}${path}`;
        core(url, 'DELETE')
          .then((reponse) => reponse.json())
          .then((data) => {
            resolve(data);
          })
          .catch(async (error) => {
            reject(error);
          });
      });
      return promise;
    },
    cancelRequest: () => {
      const oldcontroller = abortController.getInstance();
      oldcontroller.abort();
    },
  };
};

export default Api;

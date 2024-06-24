/**
 * Copyright (c) Flexi Apps.
 *
 * Functions to save and retrieve datas from AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import reportError from 'lib/errorHandler';

const appName = require('../../package.json').name;

function getSession() {
  var promise = new Promise(async (resolve, reject) => {
    try {
      const result = await AsyncStorage.getItem(
        `@fl${appName.toLowerCase()}` + ':session',
      );
      resolve(result);
    } catch (error) {
      reportError('get session error', error);
      reject(error);
    }
  });
  return promise;
}

function setSession(session) {
  var promise = new Promise((resolve) => {
    try {
      AsyncStorage.setItem(`@fl${appName.toLowerCase()}` + ':session', session);
      resolve();
    } catch (error) {
      reportError('set session error', error);
    }
  });

  return promise;
}

function clearSession() {
  var promise = new Promise((resolve, reject) => {
    try {
      AsyncStorage.removeItem(`@fl${appName.toLowerCase()}` + ':session');
      resolve();
    } catch (error) {
      reportError('remove session error', error);
      reject(error);
    }
  });

  return promise;
}

//----------------------------------- token

function getToken() {
  var promise = new Promise(async (resolve, reject) => {
    try {
      const result = await AsyncStorage.getItem(
        `@fl${appName.toLowerCase()}` + ':token',
      );
      resolve(result);
    } catch (error) {
      reportError('get token error', error);
      reject(error);
    }
  });
  return promise;
}

function setToken(token) {
  var promise = new Promise((resolve) => {
    try {
      AsyncStorage.setItem(`@fl${appName.toLowerCase()}` + ':token', token);
      resolve();
    } catch (error) {
      reportError('set token error', error);
    }
  });

  return promise;
}

function clearToken() {
  var promise = new Promise((resolve, reject) => {
    try {
      AsyncStorage.removeItem(`@fl${appName.toLowerCase()}` + ':token');
      resolve();
    } catch (error) {
      reportError('remove token error', error);
      reject(error);
    }
  });

  return promise;
}

const clearAllItems = async () => {
  var promise = new Promise((resolve, reject) => {
    try {
      AsyncStorage.multiRemove([
        `@fl${appName.toLowerCase()}` + ':token',
        `@fl${appName.toLowerCase()}` + ':session',
      ]);
      resolve();
    } catch (error) {
      reportError('remove token error', error);
      reject(error);
    }
  });

  return promise;
};

//----------------------------------- firstTimeUser

const FIRST_TIME_USER_KEY = `@fl${appName.toLowerCase()}` + ':firstTimeUser';

// Function to check if the user is a first-time user
async function isFirstTimeUser() {
  try {
    const value = await AsyncStorage.getItem(FIRST_TIME_USER_KEY);
    return value === null;
  } catch (error) {
    console.error('Error checking if first-time user:', error);
    return false;
  }
}

// Function to set the first-time user flag
async function setFirstTimeUserFlag() {
  try {
    await AsyncStorage.setItem(FIRST_TIME_USER_KEY, 'true');
  } catch (error) {
    console.error('Error setting first-time user flag:', error);
  }
}

// Function to clear the first-time user flag (for testing purposes)
async function clearFirstTimeUserFlag() {
  try {
    await AsyncStorage.removeItem(FIRST_TIME_USER_KEY);
  } catch (error) {
    console.error('Error clearing first-time user flag:', error);
  }
}

//----------------------------------- MapViewModal

const MapView_Modal_USER_KEY = `@fl${appName.toLowerCase()}` + ':mapViewModal';

// Function to check if the user is a first-time user
async function dontShowMapViewModalAgain() {
  try {
    const value = await AsyncStorage.getItem(MapView_Modal_USER_KEY);
    return value;
  } catch (error) {
    console.error('Error checking if ShowMapViewModalAgain:', error);
    return false;
  }
}

// Function to set the first-time user flag
async function setDontShowMapViewModalAgain(props) {
  try {
    console.log('Setting ShowMapViewModalAgain:', props);
    const stringValue = props.toString();
    await AsyncStorage.setItem(MapView_Modal_USER_KEY, stringValue);
  } catch (error) {
    console.error('Error setting ShowMapViewModalAgain:', error);
  }
}

// Function to clear the first-time user flag (for testing purposes)
async function clearShowMapViewModalAgain() {
  try {
    await AsyncStorage.removeItem(FIRST_TIME_USER_KEY);
  } catch (error) {
    console.error('Error clearingShowMapViewModalAgain:', error);
  }
}

//----------------------------------- search history

const SEARCH_HISTORY_KEY = `@${appName.toLowerCase()}:searchHistory`;

// Function to get the search history from AsyncStorage
async function getSearchHistory() {
  try {
    const jsonValue = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting search history:', error);
    return [];
  }
}

// Function to add a search item to the search history
async function addSearchItem(item) {
  try {
    console.log('Adding search item:', item);
    const searchHistory = await getSearchHistory();
    console.log('Current search history:', searchHistory);
    if (searchHistory.length >= 4) {
      console.log('Removing the first (oldest) item');
      searchHistory.shift(); // Remove the first (oldest) item
    }
    searchHistory.push(item);
    await AsyncStorage.setItem(
      SEARCH_HISTORY_KEY,
      JSON.stringify(searchHistory),
    );
  } catch (error) {
    console.error('Error adding search item:', error);
  }
}

// Function to remove item from search history
async function removeFromSearchHistory(item) {
  try {
    console.log('Removing item from search history:', item);
    const searchHistory = await getSearchHistory();
    const updatedHistory = searchHistory.filter(
      (historyItem) => historyItem !== item,
    );
    await AsyncStorage.setItem(
      SEARCH_HISTORY_KEY,
      JSON.stringify(updatedHistory),
    );
  } catch (error) {
    console.error('Error removing item from search history:', error);
  }
}

// Function to clear the search history
async function clearSearchHistory() {
  try {
    await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing search history:', error);
  }
}

export default {
  getSession,
  setSession,
  clearSession,
  //----------
  getToken,
  setToken,
  clearToken,
  // Clear all Items
  clearAllItems,
  //----------
  isFirstTimeUser,
  setFirstTimeUserFlag,
  clearFirstTimeUserFlag,
  //----------
  dontShowMapViewModalAgain,
  setDontShowMapViewModalAgain,
  clearShowMapViewModalAgain,
  //----------
  getSearchHistory,
  addSearchItem,
  removeFromSearchHistory,
  clearSearchHistory,
};

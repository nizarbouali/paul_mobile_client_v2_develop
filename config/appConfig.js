import {getInstalledVersion} from 'utils/versionning';

// Forcer l'utilisateur à mise à jourer l'application via les stores
// By default - In the pub case should be false, else trues
export const forceUpdateFromStore = false;

// Get App Version
const appVersion = getInstalledVersion();

export const versionOS = appVersion;

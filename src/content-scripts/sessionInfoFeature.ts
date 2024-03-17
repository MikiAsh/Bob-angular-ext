import { MessageAction } from '../app/models/model';

export const initSessionInfoFeature = () => {
  const LOCAL_STORAGE_INFO_KEY = 'ajs_user_traits';
  const LOCAL_STORAGE_USER_ID = 'ajs_user_id';

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const appLoginElement = document.querySelector('app-login');
    if (appLoginElement) { // you are at the login page
      sendResponse(null);
    }
    else {
      if (request.action == MessageAction.SessionInfoLocalStorage) {
        try {
          const info = localStorage.getItem(LOCAL_STORAGE_INFO_KEY);
          const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
          const parsedInfo = JSON.parse(info);
          parsedInfo.numericUserId = userId.replaceAll('"', '');
          sendResponse(parsedInfo);
        } catch (error) {
          sendResponse(null);
        }

      }
    }

    return true; // Keep the messaging channel open for sendResponse
  });
};

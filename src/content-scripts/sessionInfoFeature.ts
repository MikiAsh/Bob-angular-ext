import { MessageAction } from '../app/models/model';

export const initSessionInfoFeature = () => {
  const LOCAL_STORAGE_KEY = 'ajs_user_traits';

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == MessageAction.SessionInfoLocalStorage) {
      const value = localStorage.getItem(LOCAL_STORAGE_KEY);
      sendResponse(value);
    }
    return true; // Keep the messaging channel open for sendResponse
  });
};

import { MessageAction } from '../app/models/model';

export const initSessionInfoFeature = () => {
  const sessionDetails = localStorage.getItem('ajs_user_traits');

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == MessageAction.SessionInfoLocalStorage) {
      const value = localStorage.getItem('ajs_user_traits');
      sendResponse(value);
    }
    return true; // Keep the messaging channel open for sendResponse
  });
};

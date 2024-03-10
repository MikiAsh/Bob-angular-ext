import { StorageAction } from '../app/models/storage';

export const initZoomFeature = () => {

  const ZOOM_URL = 'https://hibob.zoom.us/';
  let zoomCloseDelaySeconds: number | null = null;

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === StorageAction.UpdateZoomCloseDelaySeconds) {
      zoomCloseDelaySeconds = request.zoomCloseDelaySeconds;
    }
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
   if (changeInfo.url && zoomCloseDelaySeconds) {
      if (changeInfo.url.startsWith(ZOOM_URL)) {
        setTimeout(() => {
          chrome.tabs.remove(tabId);
        }, zoomCloseDelaySeconds * 1000);
      }
   }
  });

};

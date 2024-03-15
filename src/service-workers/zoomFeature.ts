import { MessageAction } from '../app/models/model';

export const initZoomFeature = () => {

  const ZOOM_URL = 'https://hibob.zoom.us/';
  let zoomCloseDelaySeconds: number | null = null;

  // Onload, see if user have value in the storage
  chrome.storage.sync.get(MessageAction.ZoomDelaySeconds).then(
    res => {
      if (res) {
        zoomCloseDelaySeconds = res[MessageAction.ZoomDelaySeconds];
      }}
  );
  // Else, listen for a message to activate the feature
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (zoomCloseDelaySeconds !== null) {
      if (request.action === MessageAction.ZoomDelaySeconds) {
        zoomCloseDelaySeconds = request.zoomCloseDelaySeconds;
      }
    }
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && zoomCloseDelaySeconds) {
      if (changeInfo.url.startsWith(ZOOM_URL)) {
        setTimeout(() => {
          // Verify tabId exists
          chrome.tabs.get(tabId, (tab) => {
            if (tab) {
              chrome.tabs.remove(tabId);
            } else {
              console.log(`Tab with id ${tabId} does not exist.`);
            }
          });
        }, zoomCloseDelaySeconds * 1000);
      }
    }
  });

};

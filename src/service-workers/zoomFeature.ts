import { MessageAction } from '../app/models/model';

export const initZoomFeature = () => {
  const ZOOM_URL = 'https://hibob.zoom.us/';

  // Onload, see if user have value in the storage
  chrome.storage.sync.get(MessageAction.ZoomDelaySeconds, (res) => {
    let zoomCloseDelaySeconds: number | null = null;

    if (res) {
      zoomCloseDelaySeconds = res[MessageAction.ZoomDelaySeconds];
      enableFeature(zoomCloseDelaySeconds);
    } else listenForStorageChange(zoomCloseDelaySeconds);
  });

  const listenForStorageChange = (zoomCloseDelaySeconds) => {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      for (let key in changes) {
        if (key === MessageAction.ZoomDelaySeconds) {
          enableFeature(zoomCloseDelaySeconds);
        }
      }
    });
  };

  const enableFeature = (zoomCloseDelaySeconds) => {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.url && zoomCloseDelaySeconds) {
        if (changeInfo.url.startsWith(ZOOM_URL)) {
          setTimeout(() => {
            chrome.tabs.remove(tabId);
          }, zoomCloseDelaySeconds * 1000);
        }
      }

      return true; // Keep the channel open
    });
  };
};

/**
 * There is an error thrown for unknown reason:
 * Error: No tab with id: xxxx
 */

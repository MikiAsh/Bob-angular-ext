import { SelectElement } from '../app/models/DOMselectors';
import { StorageActions, StorageLoginEntry } from '../app/models/model';

export const initInstantLoginFeature = () => {
  chrome.storage.sync.get(StorageActions.InstantLogin, (res: StorageLoginEntry) => {
    if (res[StorageActions.InstantLogin].featureEnabled) {
      activate();
    }
  });
}

const activate = () => {
  const extensionRect = document.createElement("div");
  extensionRect.id = "bob-multi-tool";
  document.querySelector(SelectElement.LoginApp).appendChild(extensionRect);
}
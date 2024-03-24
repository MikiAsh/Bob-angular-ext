import { SelectElement } from '../app/models/DOMselectors';
import { StorageActions, StorageLoginEntry, UserLogin } from '../app/models/model';

export const initInstantLoginFeature = () => {
  chrome.storage.sync.get(StorageActions.InstantLogin, (res: StorageLoginEntry) => {
    if (res[StorageActions.InstantLogin].featureEnabled) {
      start();
    }
  });
}

const start = async () => {
  const extensionRect = document.createElement("div");
  extensionRect.id = "bob-multi-tool";
  const storageData = await chrome.storage.sync.get(StorageActions.InstantLogin);
  const userLogins = storageData[StorageActions.InstantLogin]?.['userLogins'] ?? [];
  if (userLogins?.length === 0) return;

  (userLogins as UserLogin[]).forEach(login => {
    const clickable = document.createElement("button");
    clickable.type = "button";
    clickable.innerText = login.userLoginName;
    extensionRect.appendChild(clickable);
  });

  document.querySelector(SelectElement.LoginApp).appendChild(extensionRect);
}
export const appName = 'Bob-multitool-extension';

export enum MessageAction {
  SessionInfoLocalStorage = 'SessionInfoLocalStorage',
}

export enum StorageActions {
  ZoomDelaySeconds = 'ZoomDelaySeconds',
  InstantLogin = 'InstantLogin'
}

export interface StorageLoginEntry {
  [StorageActions.InstantLogin]: Login,
}

export interface Login {
  featureEnabled: boolean,
  oktaLoginEmail: string,
  userLogins: UserLogin[],
}

export interface UserLogin {
  sort: number,
  userLoginEmail: string,
  userLoginName: string,
  userLoginPassword: string,
}





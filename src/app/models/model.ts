
export enum Feature {
  Login = 'login',
  Toggles = 'toggles',
  Zoom = 'zoom',
  SessionInfo = 'sessionInfo',
}

export enum MessageAction {
  SessionInfoLocalStorage = 'SessionInfoLocalStorage',
  ZoomDelaySeconds = 'ZoomDelaySeconds',
}

export enum StorageActions {

}

export interface Login {
  sort: number,
  name: string,
  email: string,
  password: string,
}




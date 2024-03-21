
export enum MessageAction {
  SessionInfoLocalStorage = 'SessionInfoLocalStorage',
}

export enum StorageActions {
  ZoomDelaySeconds = 'ZoomDelaySeconds',
  InstantLogin = 'InstantLogin'
}

export interface Login {
  sort: number,
  name: string,
  email: string,
  password: string,
}




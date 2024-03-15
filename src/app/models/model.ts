
export enum Feature {
  Login = 'login',
  Toggles = 'toggles',
  Zoom = 'zoom',
  SessionInfo = 'sessionInfo',
  DarkMode = 'darkMode'
}

export enum MessageAction {
  SessionInfoLocalStorage = 'SessionInfoLocalStorage',
  ZoomDelaySeconds = 'ZoomDelaySeconds',
}

export enum StorageActions {

}

// export type StorageModel = {
//   [K in Feature]?: {
//      actions: { [KY in StorageActions]: string };
//      keys: { [keys: string]: string };
//   };
//  };

// export const StorageData: StorageModel = {
//   [Feature.Zoom]: {
//     actions: {
//       updateZoomCloseDelaySeconds: 'UpdateZoomCloseDelaySeconds'
//     },
//     keys: {
//       zoomDelaySeconds: 'zoomDelaySeconds'
//     }
//   }
// }



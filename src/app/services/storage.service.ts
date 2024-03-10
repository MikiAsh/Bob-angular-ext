import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChromeStorageService {

  constructor() { }

  // pass null to get all items from storage
  get(keys: string | string[] | null): Promise<{ [key: string]: any }> {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(keys, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(typeof keys === 'string' ? result[keys] : result);
        }
      });
    });
  }

  set(items: { [key: string]: any }): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set(items, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  remove(keys: string | string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.remove(keys, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  // clears all data from the storage
  clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.clear(() => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }
}
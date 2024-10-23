import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ChromeStorageService } from '../../services/storage.service';
import { QParams, StorageActions, TogglesHistory, appName } from '../../models/model';

const QSTRING_PARAMS = ['toggles', 'removeToggles'];
const HISTORY_SIZE = 4;


@Component({
  selector: 'app-querystring-toggles',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './querystring-toggles.component.html',
  styleUrl: './querystring-toggles.component.scss'
})
export class QuerystringTogglesComponent {

  private storageService = inject(ChromeStorageService);

  paramsObject: QParams = { toggles: [], removeToggles: [] };
  paramsObjectInitialSnapshot: QParams = { toggles: [], removeToggles: [] };
  tabUrl: string;
  addHistory = new FixedArray<string>(HISTORY_SIZE);
  removeHistory = new FixedArray<string>(HISTORY_SIZE);

  async ngOnInit() {
    const url = await this.getTabUrl();
    if (url) {
      this.extractParams(url);
      this.populateSavedHistory();
    }
  }

  private async getTabUrl(): Promise<string> {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    this.tabUrl = tab?.url || '';
    return this.tabUrl;
  }

  private extractParams(tabUrl: string): QParams | null {
    const url = new URL(tabUrl);

    if (url.searchParams.size === 0) return null;

    url.searchParams.forEach((value, key) => {
      if (!QSTRING_PARAMS.includes(key)) return;

      this.paramsObject[key] = value.split(',');
    });

    this.paramsObjectInitialSnapshot = JSON.parse(JSON.stringify(this.paramsObject));

    return this.paramsObject;
  }

  private async populateSavedHistory(): Promise<void> {
    const history: TogglesHistory = await this.storageService.get(StorageActions.UrlToggles);
    if (history?.toggles?.length) {
      this.addHistory.array = [...history.toggles];
    }
    if (history?.removeToggles?.length) {
      this.removeHistory.array = [...history.removeToggles];
    }
  }

  deleteItem(key: keyof QParams, item: string): void {
    this.paramsObject[key] = this.paramsObject[key].filter((i: string) => i !== item);
  }

  updateUrl(): void {
    if (this.isEqual(this.paramsObject, this.paramsObjectInitialSnapshot)) return;
    this.saveHistoryToStorage();
    const updatedUrl = new URL(this.tabUrl);

    Object.keys(this.paramsObject).forEach((key) => {
      const valueArray = this.paramsObject[key];

      if (valueArray?.length > 0) {
        updatedUrl.searchParams.set(key, valueArray.join(','));
      } else {
        updatedUrl.searchParams.delete(key);
      }
    });

    chrome.tabs.update(undefined, { url: updatedUrl.toString() });
  }

  addItem(key: keyof QParams, inputElement: HTMLInputElement): void {
    const value = inputElement.value;
    if (value.trim() === '') return;
    this.paramsObject[key].push(value);
    inputElement.value = '';

    this.addItemToHistory(key, value);
  }

  private addItemToHistory(key: keyof QParams, value: string): void {
    switch (key) {
      case 'toggles':
        this.addHistory.push(value);
        break;

      case 'removeToggles':
        this.removeHistory.push(value);
        break;
    }
  }

  private isEqual(obj1: QParams, obj2: QParams): boolean {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    if (obj1Keys.length !== obj2Keys.length) return false;

    for (const key of obj1Keys) {
      if (!obj2.hasOwnProperty(key)) return false;
      if (obj1[key]?.length !== obj2[key]?.length) return false;
      for (let i = 0; i < obj1[key].length; i++) {
        if (obj1[key][i] !== obj2[key][i]) return false;
      }
    }

    return true;
  }

  private async saveHistoryToStorage(): Promise<void> {
    const togglesHistory: TogglesHistory = {
      toggles: this.addHistory.getArray() ,
      removeToggles: this.removeHistory.getArray()
    };
    const saveObj = { [StorageActions.UrlToggles]: togglesHistory};
    await this.storageService.set(saveObj);
  }
}

class FixedArray<T> {
  public array: T[];

  constructor(private size: number) {
    this.array = [];
  }

  push(item: T): void {
    if (this.array.length === this.size) {
      this.array.shift(); // Remove the first item if the array is full
    }
    this.array.push(item);
  }

  getArray(): T[] {
    return this.array;
  }
}

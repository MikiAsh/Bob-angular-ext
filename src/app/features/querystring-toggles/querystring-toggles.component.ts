import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

const QSTRING_PARAMS = ['toggles', 'removeToggles'];
type QParams = { toggles?: string[], removeToggles?: string[] };

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

  paramsObject: QParams = { toggles: [], removeToggles: [] };
  tabUrl: string;

  async ngOnInit() {
    const url = await this.getTabUrl();
    url && this.extractParams(url);
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

      this.paramsObject[key as keyof QParams] = value.split(',');
    });

    return this.paramsObject;
  }

  deleteItem(key: keyof QParams, item: string): void {
    this.paramsObject[key] = this.paramsObject[key].filter((i: string) => i !== item);
  }

  updateUrl(): void {
    const updatedUrl = new URL(this.tabUrl);
    console.log('url', updatedUrl);

    Object.keys(this.paramsObject).forEach((key) => {
      const valueArray = this.paramsObject[key as keyof QParams];

      if (valueArray?.length > 0) {
        updatedUrl.searchParams.set(key, valueArray.join(','));
      } else {
        updatedUrl.searchParams.delete(key);
      }
    });

    console.log('Updated URL', updatedUrl);

    chrome.tabs.update(undefined, { url: updatedUrl.toString() });
  }
}

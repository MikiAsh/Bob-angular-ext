import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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

  async ngOnInit() {
    const url = await this.getTabUrl();
    console.log('tab', url);
  }

  private async getTabUrl(): Promise<string> {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    return tab.url || '';
  }
}

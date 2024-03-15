import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageAction } from '../../models/model';

@Component({
  selector: 'app-session-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.scss',
})
export class SessionDetailsComponent implements OnInit {

  sessionInfo: {
    [key: string]: any;
  };

  ngOnInit(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: MessageAction.SessionInfoLocalStorage },
        (response) => {
          this.processLocalStorageInfo(response);
        }
      );
    });
  }

  processLocalStorageInfo(info: string): void {
    console.log('aaaaaaa', info);
    this.sessionInfo = JSON.parse(info);
    console.log('bbbbbb', this.sessionInfo);
  }
}

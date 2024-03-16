import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MessageAction } from '../../models/model';

@Component({
  selector: 'app-session-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.scss',
})
export class SessionDetailsComponent implements OnInit {

  private cdr = inject(ChangeDetectorRef);
  sessionInfo: {
    [key: string]: any;
    company: string,
    name: string,
    email?: string,
    isManager: boolean,
    role: string,
  };

  ngOnInit(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: MessageAction.SessionInfoLocalStorage },
        (response) => {
          response && this.processLocalStorageInfo(response);
        }
      );
    });
  }

  processLocalStorageInfo(info: string): void {
    const parsedInfo = JSON.parse(info);
    this.sessionInfo = parsedInfo;
    console.log('the info', this.sessionInfo);
    this.cdr.detectChanges();
  }
}

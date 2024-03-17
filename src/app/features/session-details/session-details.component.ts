import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MessageAction } from '../../models/model';

type LocalStorageInfo = {
  [key: string]: any;
  company: string,
  name: string,
  email?: string,
  isManager: boolean,
  role: string,
  numericUserId: string
};

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
  sessionInfo: LocalStorageInfo | null = null;

  ngOnInit(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: MessageAction.SessionInfoLocalStorage },
        (response) => {
          response && this.handleResponse(response);
        }
      );
    });
  }

  handleResponse(info: LocalStorageInfo): void {
    this.sessionInfo = info;
    this.cdr.detectChanges();
  }
}

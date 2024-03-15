import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ChromeStorageService } from '../../services/storage.service';
import { MessageAction } from '../../models/model';

const MESSAGES = {
  disabled: 'This feature is currently disabled. <br/>Set a number bigger than zero to activate it.',
  enabled: 'Zoom tab will be automatically closed after'
};
@Component({
  selector: 'app-zoom-tab',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './zoom-tab.component.html',
  styleUrl: './zoom-tab.component.scss'
})
export class ZoomTabComponent implements AfterViewInit, OnInit {

  private storageService = inject(ChromeStorageService);

  @ViewChild('delayInput') delayInput: ElementRef;
  @ViewChild('msgDiv') msgDiv: ElementRef;
  storageCloseDelay = 0;

  ngOnInit(): void {
    this.activateAndsetStatusMessage();
  }

  ngAfterViewInit() {
    this.delayInput.nativeElement.focus();
  }

  save(msDelay: string): void {
    let closeDelay = Number(msDelay);
    if (closeDelay <= 0) closeDelay = 0

    chrome.storage.sync.set({
      [MessageAction.ZoomDelaySeconds]: closeDelay
    }, () => {
      this.activateAndsetStatusMessage();
    });
  }

  private activateAndsetStatusMessage(): void {
    this.storageService.get(MessageAction.ZoomDelaySeconds).then((result) => {
      const res = result || 0;
      const displayText = res ? `${MESSAGES.enabled} ${res} seconds` : MESSAGES.disabled;
      this.delayInput.nativeElement.value = res;
      this.msgDiv.nativeElement.innerHTML = displayText;

      chrome.runtime.sendMessage({
        action: MessageAction.ZoomDelaySeconds,
        zoomCloseDelaySeconds: res
     });
    })
  }

}

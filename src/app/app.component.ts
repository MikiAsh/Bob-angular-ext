import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { QuerystringTogglesComponent } from './features/querystring-toggles/querystring-toggles.component';
import { ChromeStorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, QuerystringTogglesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private storageService = inject(ChromeStorageService);
  private router = inject(Router);
  title = 'angular_ext';

  ngOnInit(): void {
    this.redirectIfNotBob();
  }

  // for debugging only
  logStorage(): void {
    this.storageService.get(null).then(res => console.dir(res));
  }

  // for debugging only
  clearStorage(): void {
    this.storageService.clear().then(() => console.dir(this.storageService.get(null)))
  }

  private async redirectIfNotBob() {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    const url = new URL(tab.url);
    const domain = url.hostname;

    if (!domain.includes('hibob.com')) {
      this.router.navigate(['not-bob'])
    }

  }
}



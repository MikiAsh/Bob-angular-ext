import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { QuerystringTogglesComponent } from './features/querystring-toggles/querystring-toggles.component';
import { ChromeStorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, QuerystringTogglesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private storageService = inject(ChromeStorageService);
  title = 'angular_ext';

  logStorage(): void {
    this.storageService.get(null).then(res => console.dir(res));
  }

  clearStorage(): void {
    this.storageService.clear().then(() => console.dir(this.storageService.get(null)))
  }
}


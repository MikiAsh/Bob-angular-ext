import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { QuerystringTogglesComponent } from './features/querystring-toggles/querystring-toggles.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, QuerystringTogglesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular_ext';
}

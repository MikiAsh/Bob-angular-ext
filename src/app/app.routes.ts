import { Routes } from '@angular/router';
import { QuerystringTogglesComponent } from './features/querystring-toggles/querystring-toggles.component';
import { InstantLoginComponent } from './features/instant-login/instant-login.component';
import { ZoomTabComponent } from './features/zoom-tab/zoom-tab.component';
import { SessionDetailsComponent } from './features/session-details/session-details.component';
import { NotBobComponent } from './features/not-bob/instant-login.component';

export const routes: Routes = [
  { path: '', component: InstantLoginComponent, pathMatch: 'full' },
  { path: 'instant-login', component: InstantLoginComponent },
  { path: 'qstring', component: QuerystringTogglesComponent },
  { path: 'zoom-tab', component: ZoomTabComponent },
  { path: 'details', component: SessionDetailsComponent },
  { path: 'not-bob', component: NotBobComponent },
];

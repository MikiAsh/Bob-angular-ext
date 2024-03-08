import { Routes } from '@angular/router';
import { QuerystringTogglesComponent } from './features/querystring-toggles/querystring-toggles.component';
import { InstantLoginComponent } from './features/instant-login/instant-login.component';
import { ZoomTabComponent } from './features/zoom-tab/zoom-tab.component';
import { CompanyDetailsComponent } from './features/company-details/company-details.component';
import { DarkModeComponent } from './features/dark-mode/dark-mode.component';

export const routes: Routes = [
  { path: '', component: InstantLoginComponent, pathMatch: 'full' },
  { path: 'instant-login', component: InstantLoginComponent },
  { path: 'qstring', component: QuerystringTogglesComponent },
  { path: 'zoom-tab', component: ZoomTabComponent },
  { path: 'details', component: CompanyDetailsComponent },
  { path: 'dark-mode', component: DarkModeComponent },
];

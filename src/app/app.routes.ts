import { Routes } from '@angular/router';
import { QuerystringTogglesComponent } from './features/querystring-toggles/querystring-toggles.component';

export const routes: Routes = [
  { path: '', component: QuerystringTogglesComponent, pathMatch: 'full' }, // Default route with pathMatch
  { path: 'qstring', component: QuerystringTogglesComponent }
];

// export const routes: Routes = [
//   {
//     path: '',
//     component: AppComponent,
//     children: [
//       { path: '', component: QuerystringTogglesComponent, pathMatch: 'full' }, // Default route with pathMatch
//       // { path: 'one-click-login', component: null },
//       { path: 'url-toggles', component: QuerystringTogglesComponent },
//       // { path: 'zoom-tab-closer', component: null },
//       // { path: 'session-details', component: null },
//       // { path: 'dark-mode', component: null }
//     ]
//   }
// ];
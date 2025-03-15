import { Routes } from '@angular/router';
import { UnlocksComponent } from './unlocks/unlocks.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  //{ path: 'app', component: AppComponent}, // Accessible via /page1
  { path: 'unlocks', component: UnlocksComponent }, // Accessible via /page1
  // { path: '', redirectTo: '/app', pathMatch: 'full' } // Redirection par défaut vers /page1
];

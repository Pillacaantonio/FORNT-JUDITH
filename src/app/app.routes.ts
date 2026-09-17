import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', redirectTo: '/main/inicio', pathMatch: 'full' },
  { path: 'main', loadComponent: () => import('./pages/main/dashboad/dashboad.component'), loadChildren: () => import('./pages/main/dashboad/dashboad.routes').then(m => m.DashboadRoutes) },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.default) },
  { path: '**', redirectTo: '/main/inicio' },
];

import { Routes } from '@angular/router';
import { routesMain } from './pages/pages.routes';
import { DashboadRoutes } from './pages/main/dashboad/dashboad.routes';

export const routes: Routes = [
    {
        path: '',  
        redirectTo: '/login',  
        pathMatch: 'full',  
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./auth/login/login.component').then((m) => m.default),
    },
    {
    path: 'dashboad',
    loadComponent:()=>import('./pages/main/dashboad/dashboad.component'),
    loadChildren: () => import('./pages/main/dashboad/dashboad.routes').then(value => value.DashboadRoutes),
  },
 
    

    ...routesMain
  


];

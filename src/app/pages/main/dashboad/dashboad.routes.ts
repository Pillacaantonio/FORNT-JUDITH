import { Routes } from "@angular/router"
export const DashboadRoutes: Routes = [
    {
        path: 'panel',
        loadComponent: () => import('./panel/panel.component'),
    },
    {
        path: 'listado',
        loadComponent: () => import('./listado/listado.component')
    },
     {
        path: 'cotizacion',
        loadComponent: () => import('./cotizacion/cotizacion.component')
    },
    {
        path: '**',
        redirectTo: 'panel',
        pathMatch: 'full',
    },
]
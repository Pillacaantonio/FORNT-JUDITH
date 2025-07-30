import { Routes } from "@angular/router"
export const DashboadRoutes: Routes = [
    {
        path: 'panel',
        loadComponent: () => import('./listado/listado.component'),
    },
    {
        path: 'listado',
        loadComponent: () => import('./listado/listado.component')
    },
    {
        path: '**',
        redirectTo: 'dasboad',
        pathMatch: 'full',
    },
]
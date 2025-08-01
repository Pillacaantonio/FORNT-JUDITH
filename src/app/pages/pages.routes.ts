import { Routes} from "@angular/router";

export const routesMain: Routes = [
    {
        path: 'main',
        loadComponent:()=> import('./main/dashboad/dashboad.component'),
         loadChildren: () => import('./main/dashboad/dashboad.routes').then(value => value.DashboadRoutes),
    } 
];
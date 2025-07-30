import { Routes} from "@angular/router";

export const routesMain: Routes = [
    {
        path: 'main',
        loadComponent:()=> import('./main/dashboad/dashboad.component'),
    },
    
    
   
 
];
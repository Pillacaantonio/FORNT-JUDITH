import { Routes} from "@angular/router";

export default[
    {
        path: 'auth',
        loadComponent:()=> import('./login/login.component'),
    }
] as Routes;
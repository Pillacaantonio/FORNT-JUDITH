import { Routes } from '@angular/router';
export const DashboadRoutes: Routes = [
  { path: 'inicio', loadComponent: () => import('./panel/panel.component') },
  { path: 'catalogo', loadComponent: () => import('./catalogo/catalogo.component') },
  { path: 'producto/:id', loadComponent: () => import('./producto/producto.component') },
  { path: 'cotizacion', loadComponent: () => import('./cotizacion/cotizacion.component') },
  { path: 'carrito', loadComponent: () => import('./carrito/carrito.component') },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', redirectTo: 'inicio' },
];

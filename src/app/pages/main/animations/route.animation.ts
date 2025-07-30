 
import {animate, group, query, style, transition, trigger} from "@angular/animations";

export const RouteAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    // Preparar ambos elementos (entrante y saliente)
    query(':enter, :leave', style({position: 'absolute', width: '100%'}), {optional: true}),

    group([
      // Saliente hacia la izquierda
      query(':leave', [
        animate('300ms ease-out', style({transform: 'translateX(-100%)', opacity: 0}))
      ], {optional: true}),

      // Entrante desde la derecha
      query(':enter', [
        style({transform: 'translateX(100%)', opacity: 0}),
        animate('300ms ease-out', style({transform: 'translateX(0%)', opacity: 1}))
      ], {optional: true}),
    ])
  ])
]);
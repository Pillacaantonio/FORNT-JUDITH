import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../services/cart/cart.service';
import { environment } from '../../../../../environments/environment';

@Component({ selector: 'app-carrito', standalone: true, imports: [RouterLink], templateUrl: './carrito.component.html' })
export default class CarritoComponent {
  readonly cart = inject(CartService); readonly delivery = 15;
  total(): number { return this.cart.total() + (this.cart.items().length ? this.delivery : 0); }
  checkout(): void { if (!this.cart.items().length) return; const lines = this.cart.items().map(i => `- ${i.titulo} x${i.quantity}: S/. ${(i.precioActual * i.quantity).toFixed(2)}`); window.open(`https://wa.me/${environment.whatsappNumber}?text=${encodeURIComponent(['Hola, quiero confirmar mi pedido:', ...lines, `Total: S/. ${this.total().toFixed(2)}`].join('\n'))}`, '_blank', 'noopener'); }
}

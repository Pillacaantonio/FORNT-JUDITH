import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../../services/cart/cart.service';
import { PRODUCTS } from '../storefront.data';

@Component({ selector: 'app-producto', standalone: true, templateUrl: './producto.component.html' })
export default class ProductoComponent {
  private readonly route = inject(ActivatedRoute); private readonly cart = inject(CartService);
  readonly product = PRODUCTS.find(p => p.id === Number(this.route.snapshot.paramMap.get('id'))) ?? PRODUCTS[0];
  readonly quantity = signal(1); readonly selectedImage = signal(this.product.imagen);
  decrease(): void { this.quantity.update(value => Math.max(1, value - 1)); }
  increase(): void { this.quantity.update(value => value + 1); }
  add(): void { for (let i = 0; i < this.quantity(); i++) this.cart.add(this.product); }
}

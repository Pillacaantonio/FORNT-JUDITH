import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../services/cart/cart.service';
import { PRODUCTS, StoreProduct } from '../storefront.data';

@Component({ selector: 'app-catalogo', standalone: true, imports: [CommonModule, FormsModule, RouterLink], templateUrl: './catalogo.component.html' })
export default class CatalogoComponent {
  private readonly cart = inject(CartService);
  readonly categories = ['Todos', 'Tortas', 'Cupcakes', 'Postres Individuales', 'Bocaditos', 'Ocasiones Especiales'];
  readonly active = signal('Todos');
  readonly search = signal('');
  readonly filtered = computed(() => PRODUCTS.filter(p => (this.active() === 'Todos' || p.category === this.active()) && p.titulo.toLowerCase().includes(this.search().toLowerCase())));
  setSearch(event: Event): void { this.search.set((event.target as HTMLInputElement).value); }
  add(product: StoreProduct): void { this.cart.add(product); }
}

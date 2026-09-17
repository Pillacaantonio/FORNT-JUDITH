import { Injectable, computed, signal, effect } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ProductCatalogItem {
  id: number;
  titulo: string;
  descripcion: string;
  descuento: string;
  precioActual: number;
  precioAnterior: number;
  etiqueta: string;
  color: string;
  imagen: string;
}

export interface CartItem extends ProductCatalogItem {
  quantity: number;
}

const CART_KEY = 'sweet_taste_cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  // ✅ Carga desde localStorage al iniciar
  private readonly _items = signal<CartItem[]>(this.loadFromStorage());
  private readonly _isDrawerOpen = signal(false);
  private readonly _changes = new BehaviorSubject(0);

  readonly items = this._items.asReadonly();
  readonly isDrawerOpen = this._isDrawerOpen.asReadonly();

  readonly itemCount = computed(() =>
    this._items().reduce((total, item) => total + item.quantity, 0)
  );

  readonly total = computed(() =>
    this._items().reduce((total, item) => total + item.precioActual * item.quantity, 0)
  );

  readonly changes$ = this._changes.asObservable();

  constructor() {
    // ✅ Cada vez que cambien los items, guarda en localStorage
    effect(() => {
      this.saveToStorage(this._items());
    });
  }

  // ✅ Lee el carrito desde localStorage
  private loadFromStorage(): CartItem[] {
    try {
      const data = localStorage.getItem(CART_KEY);
      return data ? (JSON.parse(data) as CartItem[]) : [];
    } catch {
      return [];
    }
  }

  // ✅ Guarda el carrito en localStorage
  private saveToStorage(items: CartItem[]): void {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      console.warn('No se pudo guardar el carrito en localStorage');
    }
  }

  add(product: ProductCatalogItem): void {
    this._items.update((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
    this.emitChange();
  }

  quantityFor(productId: number): number {
    return this._items().find((item) => item.id === productId)?.quantity ?? 0;
  }

  increase(productId: number): void {
    this._items.update((items) =>
      items.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    this.emitChange();
  }

  decrease(productId: number): void {
    this._items.update((items) =>
      items
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
    this.emitChange();
  }

  remove(productId: number): void {
    this._items.update((items) => items.filter((item) => item.id !== productId));
    this.emitChange();
  }

  clear(): void {
    this._items.set([]);
    this.emitChange();
  }

  openDrawer(): void {
    this._isDrawerOpen.set(true);
    this.emitChange();
  }

  closeDrawer(): void {
    this._isDrawerOpen.set(false);
    this.emitChange();
  }

  toggleDrawer(): void {
    this._isDrawerOpen.update((value) => !value);
    this.emitChange();
  }

  private emitChange(): void {
    this._changes.next(this._changes.value + 1);
  }
}
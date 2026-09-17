import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService, ProductCatalogItem } from '../../../../services/cart/cart.service';

@Component({ selector: 'app-main', standalone: true, imports: [CommonModule, RouterLink], templateUrl: './panel.component.html', styleUrls: ['./panel.css'] })
export default class MainComponent {
  private readonly cart = inject(CartService);
  readonly categories = [
    ['Tortas de Diseño', 'assets/figma/category-cakes.png'], ['Cupcakes Temáticos', 'assets/figma/category-cupcakes.png'],
    ['Postres Individuales', 'assets/figma/category-desserts.png'], ['Bocaditos Dulces', 'assets/figma/category-bites.png']
  ];
  readonly featured: ProductCatalogItem[] = [
    { id: 8, titulo: 'Torta Tentación de Frutos Rojos', descripcion: 'Bizcocho húmedo de vainilla, mascarpone y mermelada artesanal.', descuento: '', precioActual: 135, precioAnterior: 150, etiqueta: '', color: '', imagen: 'assets/figma/featured-berries.png' },
    { id: 9, titulo: 'Caja de Cupcakes Joya', descripcion: 'Pack de 6 cupcakes gourmet decorados a mano.', descuento: '', precioActual: 54, precioAnterior: 0, etiqueta: '', color: '', imagen: 'assets/figma/featured-cupcakes.png' },
    { id: 10, titulo: 'Tartaleta de Frambuesa y Pistacho', descripcion: 'Masa sableé, crema de pistachos y frambuesas frescas.', descuento: '', precioActual: 18, precioAnterior: 0, etiqueta: '', color: '', imagen: 'assets/figma/featured-tart.png' },
  ];
  add(product: ProductCatalogItem): void { this.cart.add(product); }
}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ListadoService } from '../../../../services/cotizacion/listado.service';
import { BaseResponse } from '../../../../interfaces/common/base_response';
import { CorrelativoData } from '../../../../interfaces/cotizacion/correlativo';
import { Logo } from '../../../../interfaces/cotizacion/logo';
import { Cliente } from '../../../../interfaces/cotizacion/cliente';
import { Vendedor } from '../../../../interfaces/cotizacion/vendedores';
import { Destino } from '../../../../interfaces/cotizacion/destino';
import { ProductoTerminado } from '../../../../interfaces/cotizacion/ProdTerminado';
import { TipoPago } from '../../../../interfaces/cotizacion/TipoPago';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface SelectedProduct extends Product {
  quantity: number;
}
@Component({
  selector: 'app-cotizacion',
  standalone: true,
  templateUrl: './cotizacion.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    FormsModule,
  ],
  styleUrls: ['./cotizacion.component.css'],
})
export default class CotizacionComponent implements OnInit {
  correlativo: number | null = null;
  deliveryOptions: Logo[] = [];
  deliveryAddress!: Logo;
  clientes: Cliente[] = [];
  clienteSeleccionado!: Cliente;
  vendedores: Vendedor[] = [];
  vendedorSeleccionado!: Vendedor;
  destinos: Destino[] = [];
  destinoSeleccionado: Destino | null = null;
  productoTerminado: ProductoTerminado[] = [];
  selectedProducts: (ProductoTerminado & { quantity: number })[] = [];
  descuento: number = 0;
  descuentoAmount: number = 0;
  monto: number = 0;
  totalFinal: number = 0;
  Math = Math;
   clientName = '';
  clientEmail = '';
  NroCotizacion = '';
  quotationDate = new Date().toLocaleDateString('es-ES');
  TipoPago:TipoPago[] = [];
  tipoPagoSeleccionado!: TipoPago;
  constructor(private listadoService: ListadoService) {
    const date = new Date();
    this.quotationDate = this.formatDate(date);
  }
  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  ngOnInit(): void {
    this.obtenerCorrelativo();
    this.obtenerLogo();
    this.obtenerCliente();
    this.obtenerVendedor();
    this.obtenerListadoPTerminados();
    this.obtenerListadoTipoPago();
  }

  onClienteSeleccionado(): void {
    if (this.clienteSeleccionado) {
      this.obtenerDestino();
      this.clientName = this.clienteSeleccionado.cliec_vnombre_cliente;
    }
  }
 obtenerCorrelativo(): void {
  this.listadoService.getCorrelativo().subscribe({
    next: ({ isSucces, data }) => {
      if (isSucces && data?.length) {
        const corr = data[0].correlativo;
        this.correlativo = corr;
        this.NroCotizacion = `${String(corr).padStart(6, '0')}`;
       }  
    },
    error: (err) => console.error('Error al obtener correlativo:', err),
  });
}
  obtenerLogo(): void {
    this.listadoService.getLogo().subscribe({
      next: (res) => {
        if (res.isSucces) {
          this.deliveryOptions = res.data;
        } else {
          console.warn('No se pudieron cargar los logos.');
        }
      },
      error: (err) => {
        console.error('Error al obtener logos:', err);
      },
    });
  }
  obtenerVendedor(): void {
    this.listadoService.getVendedor().subscribe({
      next: (res) => {
        if (res.isSucces) {
          this.vendedores = res.data as unknown as Vendedor[];
        } else {
          console.warn('No se pudieron cargar los vendedores.');
        }
      },
      error: (err) => {
        console.error('Error al obtener vendedores:', err);
      },
    });
  }
  obtenerCliente(): void {
    this.listadoService.getClientes().subscribe({
      next: (res) => {
        if (res.isSucces) {
          this.clientes = res.data;
        } else {
          console.warn('No se pudieron cargar los clientes.');
        }
      },
      error: (err) => {
        console.error('Error al obtener clientes:', err);
      },
    });
  }
  obtenerDestino(): void {
    if (
      this.clienteSeleccionado &&
      this.clienteSeleccionado.cliec_icod_cliente
    ) {
      const clienteId = this.clienteSeleccionado.cliec_vcod_cliente;

      this.listadoService.getDestino(clienteId).subscribe({
        next: (res) => {
          if (res.isSucces && Array.isArray(res.data)) {
            this.destinos = res.data as unknown as Destino[];
          } else {
            console.warn('No se pudieron cargar los destinos.');
          }
        },
        error: (err) => {
          console.error('Error al obtener destinos:', err);
        },
      });
    } else {
      console.warn(
        'No se ha seleccionado un cliente o el ID del cliente no es válido.'
      );
    }
  }
  obtenerListadoPTerminados(): void {
    this.listadoService.getListadoPTerminado().subscribe({
      next: (res) => {
        if (res.isSucces && Array.isArray(res.data)) {
          this.productoTerminado = res.data;
        } else {
          console.warn('No se pudieron cargar los productos.');
        }
      },
      error: (err) => {
        console.error('Error al obtener productos terminados:', err);
      },
    });
  }
  obtenerListadoTipoPago(): void {
   this.listadoService.getListadoTipoPago().subscribe({
      next: (res) => { if (res.isSucces) { this.TipoPago = res.data; } else {  console.warn('No se pudieron cargar lso Tipos de pago.');  }  },  error: (err) => {  console.error('Error al obtener tipo de pago:', err); }, });
  }


  addProduct(product: ProductoTerminado) {
    const existing = this.selectedProducts.find(
      (p) => p.prdc_icod_producto === product.prdc_icod_producto
    );

    if (existing) {
      existing.quantity++;
    } else {
      this.selectedProducts.push({ ...product, quantity: 1 });
    }
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeProduct(productId);
    } else {
      const product = this.selectedProducts.find(
        (p) => p.prdc_icod_producto === productId
      );
      if (product) {
        product.quantity = quantity;
      }
    }
  }
  removeProduct(productId: number): void {
    this.selectedProducts = this.selectedProducts.filter(
      (p) => p.prdc_icod_producto !== productId
    );
  }

  getTotalPrice(): number {
    return this.selectedProducts.reduce(
      (acc, p) => acc + p.prod_nprecio_venta_publico * p.quantity,
      0
    );
  }

  getTotalItems(): number {
    return this.selectedProducts.reduce((acc, p) => acc + p.quantity, 0);
  }

  isProductSelected(productId: number): boolean {
    return this.selectedProducts.some(
      (p) => p.prdc_icod_producto === productId
    );
  }

  onDescuentoChange(): void {
    this.descuento = Number(this.descuento) || 0;
    this.updateTotals();
  }
  onMontoPagado(): void {
    this.monto = Number(this.monto) || 0;
    this.updateTotals();
  }
  updateTotals(): void {
    const total = this.getTotalPrice();
    this.descuentoAmount = total * (this.descuento / 100);
    const montoFix = Number(this.monto) || 0;
    this.totalFinal = Math.max(0, total - this.descuentoAmount - montoFix);
  }

  getLabel(): string {
    if (this.monto > this.totalFinal) {
      return 'Vuelto';
    } else if (this.monto < this.totalFinal) {
      return 'Saldo';
    } else {
      return 'Vuelto';
    }
  }
  getTipoDiferencia(): string {
    return this.monto >= this.totalFinal ? 'Vuelto' : 'Saldo';
  }

  getMontoDiferencia(): number {
    const total = Number(this.totalFinal) || 0;
    const pago = Number(this.monto) || 0;
    return +Math.abs(pago - total).toFixed(2);
  }

  generarCotizacion() { 
    
   }
}

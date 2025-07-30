import { Component, OnInit, signal } from '@angular/core';

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { MultiSelectModule } from 'primeng/multiselect';
import { Select } from "primeng/select";
import { TagModule } from 'primeng/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule,
    TableModule,
    RouterLink,
    InputTextModule,
    IconField,
    InputIcon,
    MultiSelectModule,
    Select,
    TagModule,
    FormsModule,
    ReactiveFormsModule,
    Select,
    ],
  templateUrl: './listado.component.html'
})
export default class ListadoComponent  implements OnInit{
    private clickOutsideListener!: (event: Event) => void;

  ngOnInit(): void {
   this.clickOutsideListener = (event: Event) => {
      this.handleClickOutside(event);  }
   }
    private handleClickOutside(event: Event): void {
    // Solo cerrar si el sidebar está abierto
    if (!this.siderBarOpen()) {
      return;
    }
  }
    siderBarOpen = signal(false);

  products = [
    { name: 'Product 1', price: 100 },
    { name: 'Product 2', price: 200 },
  ];

  columns = [
    { field: 'name', header: 'Product Name' },
    { field: 'price', header: 'Price' }
  ];
  selectedItems: any[] = [];
  items: any[] = [{ label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2 }];
  loading: unknown;
  representatives: any[] | undefined;
  statuses: any[] | undefined;







  handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  tags: string[] = ['Urgente', 'Importante', 'Menor'];

  getSeverity(tag: string): string {
    switch (tag) {
      case 'Urgente': return 'danger';
      case 'Importante': return 'warning';
      default: return 'info';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
 import { InputTextModule } from 'primeng/inputtext';
  import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { ListadoService } from '../../../../services/cotizacion/listado.service'; 
import { Button, ButtonModule } from "primeng/button"; 
 import { TreeTableModule } from 'primeng/treetable';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
 import { SelectModule } from 'primeng/select';
 import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [
    CommonModule,
    InputIconModule,
    TableModule,
    InputTextModule,
    MultiSelectModule,
    SelectModule,
    HttpClientModule,
    TagModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
     TreeTableModule,
    IconFieldModule,
],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.css']
 })
export default class ListadoComponent implements OnInit {
   cotizaciones: any[] = [];
  first: number = 0;
  totalRecords: number = 0;
  rows: number = 5;

mensajeError: any;
openAdd() {
throw new Error('Method not implemented.');
}
   loading: boolean = true;

  
 
  constructor(private listadoService: ListadoService) {}

  ngOnInit(): void {
    this.obtenerCotizaciones();
    
  }

obtenerCotizaciones(): void {
  this.listadoService.getListadoCotizacion().subscribe(
    (response: any) => {
      if (response.isSucces) {
        this.cotizaciones = response.data; 
      } else {
        this.mensajeError = 'Error al obtener las cotizaciones';
      }
      this.loading = false;
    },
    (error) => {
      this.mensajeError = 'Error de conexión';
      this.loading = false;
    }
  );
}

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
   }

  prev() {
    if (this.first > 0) {
      this.first -= this.rows;
    }
  }

  next() {
    if (this.first + this.rows < this.totalRecords) {
      this.first += this.rows;
    }
  }

  reset() {
    this.first = 0;
  }

  isFirstPage() {
    return this.first === 0;
  }

  isLastPage() {
    return this.first + this.rows >= this.totalRecords;
  }
  
}

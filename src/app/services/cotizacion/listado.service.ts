import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { CorrelativoData } from '../../interfaces/cotizacion/correlativo';
import { BaseResponse } from '../../interfaces/common/base_response';
import { Logo } from '../../interfaces/cotizacion/logo';
import { Cliente } from '../../interfaces/cotizacion/cliente';
import { ProductoTerminado } from '../../interfaces/cotizacion/ProdTerminado';
import { TipoPago } from '../../interfaces/cotizacion/TipoPago';
import { CotizacionVenta } from '../../interfaces/cotizacion/cotizacion';

@Injectable({
  providedIn: 'root',
})
export class ListadoService {
  private base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  getListadoCotizacion() {
    const url = `${this.base_url}/Cotizacion/listadoCotizacion`;
    return this.http.get(url).pipe( tap((response) => { console.log('Respuesta de la API:(listadoCotiacion)', response);}) );
  }
  getCorrelativo(): Observable<BaseResponse<CorrelativoData[]>> {
    const url = `${this.base_url}/Cotizacion/Correlativo`;
    return this.http.get<BaseResponse<CorrelativoData[]>>(url).pipe(tap((response) => console.log('Respuesta de la API(correlativo):', response)));
  } 
  getLogo(): Observable<BaseResponse<Logo[]>> {
    const url = `${this.base_url}/Logo/ListaLogo`;
    return this.http.get<BaseResponse<Logo[]>>(url);
   
  }
  getClientes() {
    const url = `${this.base_url}/Cliente/ListaCliente`;
    return this.http.get<BaseResponse<Cliente[]>>(url);
  }
  getVendedor() {
    const url = `${this.base_url}/Vendedor/ListaVendedor`; 
    return this.http.get<BaseResponse<Cliente[]>>(url);
  }
  getDestino(cliec_icod_cliente: number) {
    const url = `${this.base_url}/Direccion/Destino/${cliec_icod_cliente}`;
    return this.http.get<BaseResponse<Cliente[]>>(url);
  }
  getListadoPTerminado(): Observable<BaseResponse<ProductoTerminado[]>> {
    return this.http.get<BaseResponse<ProductoTerminado[]>>(
      `${this.base_url}/Cotizacion/Pterminado`);
  }
   getListadoTipoPago() {
    const url = `${this.base_url}/MetodoPago/ListaMetoPago`;
    return this.http.get<BaseResponse<TipoPago[]>>(url);
  }
   insertarCotizacion(cotizacion: CotizacionVenta): Observable<any> {
    return this.http.post(`${this.base_url}/InsertarCotizacion`, cotizacion);
  }
}

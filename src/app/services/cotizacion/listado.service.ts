import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment"; 
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListadoService {
  private base_url = environment.base_url;

  constructor(private http: HttpClient) {}

  getListadoCotizacion() {
  const url = `${this.base_url}/Cotizacion/listadoCotizacion`;
  const token = localStorage.getItem('token');  
  const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();

  return this.http.get(url, { headers }).pipe(
    tap((response) => {
      console.log('Respuesta de la API:', response);   
    })
  );
}
}

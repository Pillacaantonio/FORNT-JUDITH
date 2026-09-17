import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { DashboardPostulantesResumen } from '../../interfaces/cotizacion/dashboard.interface';
 
 

@Injectable({
  providedIn: 'root',
})
export class ListadoService {
  private base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  getListadoPostulantes() {
    const url = `${this.base_url}/DatosPersonales/ListadoPostulantes`;
    return this.http.get(url).pipe( tap((response) => { console.log('Respuesta de la API:(listadoPsotulantes)', response);}) );
  }
 
  getDashboard(): Observable<DashboardPostulantesResumen> {
    const url = `${this.base_url}/Dashboard/postulantes/resumen`;
    return this.http.get<DashboardPostulantesResumen>(url).pipe( 
      tap((response) => { 
        console.log('Respuesta de la API:(listadoDashboard)', response);
      }) 
    );
 
  }
  
  
 
}

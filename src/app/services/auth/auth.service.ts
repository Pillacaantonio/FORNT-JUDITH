import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Asegúrate de importar HttpClient correctamente
import { Observable, catchError, map, of, tap } from 'rxjs';
import { UsuarioData } from '../../models/usuario_data';
import { BaseResponse } from '../../interfaces/common/base_response';
import { LoginForm } from '../../interfaces/usuario/login-form';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  base_url = environment.base_url;

  constructor(private hhtp: HttpClient, private router: Router) {}

  public usuario!: UsuarioData;

  getToken() {
    return localStorage.getItem('token');
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${this.base_url}/Usuarios/validarToken`).pipe(
      tap((resp: any) => {
        if (resp.isSucces) {
          this.usuario = resp.data;
          localStorage.setItem('token', resp.data.token);
        }
      }),
      map((resp) => true),
      catchError((error) => of(false))
    );
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  login(formData: LoginForm): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(
      `${this.base_url}/Usuarios/generate/token`,
      formData
    ).pipe(
      tap((response: BaseResponse<string>) => {
        if (response && response.data) {
           localStorage.setItem('token', response.data);
        }
      })
    );
  }
}

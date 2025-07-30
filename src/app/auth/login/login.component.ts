import { AuthService } from './../../services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,],
})
export default class LoginComponent {
  activeForm: string = "login";
  public loginForm: any;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  authService = inject(AuthService);

  constructor() {
    this.loginForm = this.fb.group({
      email: [
        localStorage.getItem('email') || '',
        [Validators.required],],
      password: ['', [Validators.required]],
      remember: [JSON.parse(localStorage.getItem('remember')!) || false]
    });
  }
  login() {
    if (this.loginForm.invalid) {
      Swal.fire('Error', 'Por favor, complete todos los campos correctamente.', 'error');
      console.log(this.loginForm.value);

      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      (resp) => {
        if (resp.isSucces) {
          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value);
            localStorage.setItem('remember', 'true');
          } else {
            localStorage.removeItem('email');
            localStorage.removeItem('remember');
          }

          this.router.navigate(['/main']);
        } else {
          Swal.fire('Error', resp.mensaje, 'error');
        }
      },
      (error) => {
        console.error(error);
        Swal.fire('Error', 'Ocurrió un error en la autenticación', 'error');
      }
    );

  }

}

import { AuthService } from './../../services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FooterComponent],
})
export default class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  entrar(): void {
    this.router.navigate(['/main']);
  }
}

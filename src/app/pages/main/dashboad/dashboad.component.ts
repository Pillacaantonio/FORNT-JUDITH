import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../../../services/cart/cart.service';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { environment } from '../../../../environments/environment';

@Component({ selector: 'app-dashboad', standalone: true, imports: [RouterLink, RouterLinkActive, RouterOutlet, FooterComponent], templateUrl: './dashboad.component.html' })
export default class DashboadComponent {
  readonly cart = inject(CartService);
  readonly whatsappUrl = `https://wa.me/${environment.whatsappNumber}`;
}

import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormsModule,HttpClientModule],
  templateUrl: './app.component.html',
  standalone:true,
  styles: [],
})
export class AppComponent {
  title = 'judithlab';
}

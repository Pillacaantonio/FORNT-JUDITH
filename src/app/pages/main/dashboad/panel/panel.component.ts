import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-panel',
  imports: [RouterLink,ReactiveFormsModule,FormsModule],
  templateUrl: './panel.component.html',
  styles: ``,
  standalone:true,
  
})

export default class PanelComponent {

}

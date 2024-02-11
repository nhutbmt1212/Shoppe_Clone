import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css'
})
export class BlankLayoutComponent {

}

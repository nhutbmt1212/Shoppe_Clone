import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';



@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})



export class MainLayoutComponent {

}
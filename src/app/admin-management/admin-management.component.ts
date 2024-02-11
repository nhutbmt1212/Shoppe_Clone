import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-management',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './admin-management.component.html',
  styleUrl: './admin-management.component.css'
})
export class AdminManagementComponent {

}

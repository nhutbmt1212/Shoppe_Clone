import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatProgressBarModule],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css'
})
export class BlankLayoutComponent {

}

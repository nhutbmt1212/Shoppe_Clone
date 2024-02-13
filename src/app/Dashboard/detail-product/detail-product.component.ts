import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { title } from 'process';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent {
  title = 'a';
}



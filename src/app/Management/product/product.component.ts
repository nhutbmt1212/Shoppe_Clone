import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  TenSanPham: string = '';
  SoLuong: number = 1;
  MoTa: string = '';
  Hang: string = '';
  HinhAnh: any;
  LoaiSanPham: string = '';

  ThemSanPham() {
    console.log(this.TenSanPham, this.SoLuong, this.Hang, this.LoaiSanPham, this.HinhAnh, this.MoTa);

  }
}

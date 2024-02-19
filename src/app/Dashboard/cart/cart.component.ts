import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartData: any;
  CheckAll: boolean = false;
  DonGiaDaGiam: number = 0;
  SoLuongGioHang: number = 1;
  TongTien: number = 0;
  valueLengthCart: number = 0;
  TongCongTienGioHang: number = 0;
  labelSoLuongThanhToan: number = 0;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const pathKey = 'path';
      const pathValue = {
        pagename: 'cart',
        id: ''
      }
      localStorage.setItem(pathKey, JSON.stringify(pathValue));
      // Lấy dữ liệu từ localStorage
      const cart = localStorage.getItem('cart');
      if (cart !== null) {
        this.cartData = JSON.parse(cart);
        for (let index = 0; index < this.cartData.length; index++) {
          this.cartData[index].GiaDaGiam = this.cartData[index].SanPham[0].DonGia - (this.cartData[index].SanPham[0].DonGia * this.cartData[index].SanPham[0].GiamGia) / 100;
          this.cartData[index].TongTien = this.cartData[index].GiaDaGiam * this.cartData[index].SoLuong;
        }
        this.valueLengthCart = this.cartData.length;
      }
    }
  }
  ThayDoiSoLuong(index: number) {
    if (this.cartData[index].SoLuong === '' || this.cartData[index].SoLuong < 1 || isNaN(this.cartData[index].SoLuong)) {
      this.cartData[index].SoLuong = 1;
    }
    this.cartData[index].TongTien = this.cartData[index].SoLuong * this.cartData[index].GiaDaGiam;
    this.CapNhatTongTien();
  }
  CheckMotSanPham(index: number) {

    if (this.cartData[index].CheckBox === true) {
      this.cartData[index].CheckBox = false;

      this.CapNhatTongTien();
      this.labelSoLuongThanhToan -= 1;
    }
    else {
      this.cartData[index].CheckBox = true;
      this.CapNhatTongTien();
      this.labelSoLuongThanhToan += 1;
    }
  }



  CheckAllCheckBox() {
    if (this.CheckAll !== false) {
      for (let index = 0; index < this.cartData.length; index++) {
        this.cartData[index].CheckBox = false;
      }
      this.TongCongTienGioHang = 0;
      this.labelSoLuongThanhToan = 0;
      this.CapNhatTongTien();

    }
    else {
      for (let index = 0; index < this.cartData.length; index++) {
        this.cartData[index].CheckBox = true;
        this.CapNhatTongTien();
      }
      this.labelSoLuongThanhToan = this.cartData.length;

    }
  }

  CapNhatTongTien() {
    this.TongCongTienGioHang = 0;
    for (let index = 0; index < this.cartData.length; index++) {
      if (this.cartData[index].CheckBox) {
        this.TongCongTienGioHang += this.cartData[index].SoLuong * this.cartData[index].GiaDaGiam;

      }

    }


  }
}

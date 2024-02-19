import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { routes } from '../../app.routes';




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
    this.LayDataCart();
  }
  LayDataCart(): void {
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
      console.log(this.cartData);

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

      this.labelSoLuongThanhToan -= 1;
    }
    else {
      this.cartData[index].CheckBox = true;

      this.labelSoLuongThanhToan += 1;
    }
    localStorage.setItem('cart', JSON.stringify(this.cartData));
    this.CapNhatTongTien();


  }



  CheckAllCheckBox() {
    if (this.CheckAll !== false) {
      for (let index = 0; index < this.cartData.length; index++) {
        this.cartData[index].CheckBox = false;
      }
      this.TongCongTienGioHang = 0;
      this.labelSoLuongThanhToan = 0;

    }
    else {
      for (let index = 0; index < this.cartData.length; index++) {
        this.cartData[index].CheckBox = true;

      }
      this.labelSoLuongThanhToan = this.cartData.length;

    }
    localStorage.setItem('cart', JSON.stringify(this.cartData));
    this.CapNhatTongTien();
  }

  CapNhatTongTien() {
    this.TongCongTienGioHang = 0;
    for (let index = 0; index < this.cartData.length; index++) {
      if (this.cartData[index].CheckBox) {
        this.TongCongTienGioHang += this.cartData[index].SoLuong * this.cartData[index].GiaDaGiam;

      }

    }


  }
  XoaGioHang(MaSP: string) {
    const helper = new JwtHelperService();
    if (isPlatformBrowser(this.platformId)) {

      const token = localStorage.getItem('token');
      if (token) {
        let found = false;
        let decode = helper.decodeToken(token);
        let MaNguoiDungToken = decode.results[0].MaNguoiDung;
        const cart = localStorage.getItem('cart');


        //nếu cart có data
        if (cart !== null) {
          let cartValue = JSON.parse(cart);
          let found = false;

          for (let index = 0; index < cartValue.length; index++) {
            if (cartValue[index].MaNguoiDung === MaNguoiDungToken && cartValue[index].SanPham[0].MaSanPham === MaSP) {
              // Xóa sản phẩm khỏi giỏ hàng

              cartValue.splice(index, 1);
              found = true;
              break;
            }
          }

          if (!found) {
            console.log('Sản phẩm không tồn tại trong giỏ hàng');
          } else {
            // Cập nhật giỏ hàng trong localstorage
            localStorage.setItem('cart', JSON.stringify(cartValue));
            this.LayDataCart();
            this.CapNhatTongTien();
          }
        }
        else {
          console.log('Giỏ hàng không xóa được');
        }
      }
    }



  }
}

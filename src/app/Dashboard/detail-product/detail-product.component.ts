import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ServiceSanPhamService } from '../../Services/service-san-pham.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css',
})
export class DetailProductComponent implements OnInit {
  MaSanPham: any;

  SanPham: any[] = [];
  CartArray: any[] = [];
  CartStorage: any = {};
  MoTa: string = '';
  DonGia: number = 0;
  GiamGia: number = 0;
  DonGiaDaGiam: number = 0;
  SoLuong: number = 1;
  SoLuongDaChon: number = 1;
  cartValueArr: any[] = [];
  TenSanPham: string = '';
  MaSanPhamLimit: string = '';
  HinhAnhDauTien: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private servicesSanPhamServices: ServiceSanPhamService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastr: ToastrService

  ) { }
  ngOnInit(): void {
    let EncodedString = this.activatedRoute.snapshot.paramMap.get('id');
    let decodedString: string = decodeURIComponent(EncodedString || '');

    // Tách chuỗi đã giải mã bằng dấu cách
    let parts: string[] = decodedString.split(' ');

    // Mã sản phẩm nằm ở vị trí thứ hai trong mảng
    this.MaSanPham = parts[1];
    if (isPlatformBrowser(this.platformId)) {
      const pathKey = 'path';
      const pathValue = {
        pagename: 'detail',
        id: this.MaSanPham,
      };
      localStorage.setItem(pathKey, JSON.stringify(pathValue));
    }
    this.servicesSanPhamServices
      .laySPTheoId(this.MaSanPham)
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.SanPham = data;
          this.MaSanPhamLimit = data[0].MaSanPham;
          this.TenSanPham = this.SanPham[0].TenSanPham;
          this.MoTa = this.SanPham[0].MoTa;
          this.DonGia = this.SanPham[0].DonGia;
          this.GiamGia = this.SanPham[0].GiamGia;
          this.SoLuong = this.SanPham[0].SoLuong;
          this.DonGiaDaGiam = this.DonGia - (this.DonGia * this.GiamGia) / 100;
        } else {
          this.router.navigate(['/not-found']);
        } this.servicesSanPhamServices.LayHinhAnhTheoMaSanPhamLimit1(this.MaSanPhamLimit).subscribe((res: any[]) => {
          this.HinhAnhDauTien = res[0].TenFileAnh


        });
      });



  }

  ThayDoiSoLuong() {
    if (this.SoLuongDaChon < 1) {
      this.SoLuongDaChon = 1;
    } else if (this.SoLuongDaChon > this.SoLuong) {
      this.SoLuongDaChon = this.SoLuong;
    }
    console.log(this.SoLuongDaChon);
  }

  AddToCart() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const helper = new JwtHelperService();
      this.cartValueArr = [];

      if (token) {
        const decodeToken = helper.decodeToken(token);
        const cart = localStorage.getItem('cart');
        this.CartStorage = {
          CheckBox: false,
          SoLuong: this.SoLuongDaChon,
          SanPham: this.SanPham,
          MaNguoiDung: decodeToken.results[0].MaNguoiDung,
        };
        //mảng của cartstorage chỉ chứa 1 đối tượng
        this.cartValueArr.push(this.CartStorage);
        //nếu có
        if (cart !== null) {
          //cartValueParsed là 1 mảng của localstorage
          let cartValueParsed = JSON.parse(cart);
          let found = false;
          //duyệt mảng của localstorage
          for (let index = 0; index < cartValueParsed.length; index++) {
            //so sánh nếu mã người dùng trùng và mã sản phẩm trùng thì
            //tăng số lượng lên (số lượng đã có sẵn trong localstorage)
            //cộng với số lượng mảng cartValueParsed đang chứa.
            if (
              cartValueParsed[index].MaNguoiDung ===
              this.cartValueArr[0].MaNguoiDung &&
              cartValueParsed[index].SanPham[0].MaSanPham ===
              this.cartValueArr[0].SanPham[0].MaSanPham
            ) {
              //xử lý sản phẩm trùng ở đây
              //kiểm tra nếu sản phẩm trùng mà cộng lại số lượng lớn hơn số lượng của sản phẩm. Thì lấy là max của số lượng sản phẩm đó
              cartValueParsed[index].SoLuong += this.cartValueArr[0].SoLuong;

              if (cartValueParsed[index].SoLuong > cartValueParsed[index].SanPham[0].SoLuong) {
                cartValueParsed[index].SoLuong = cartValueParsed[index].SanPham[0].SoLuong;
              }

              found = true;
              break;

            }

          }
          if (!found) {
            //xử lý sản phẩm không trùng ở đây
            //chỉ thêm dữ liệu mới vào localstorage
            //lấy data từ localstorage về, push vào mảng và đẩy lại vào local
            cartValueParsed.push(this.CartStorage);



          }
          this.toastr.success('Thêm sản phẩm vào giỏ hàng thành công.');
          localStorage.setItem('cart', JSON.stringify(cartValueParsed));
        }
        //done nếu không có sản phẩm trong cart
        else {
          this.toastr.success('Thêm sản phẩm vào giỏ hàng thành công.');

          localStorage.setItem('cart', JSON.stringify(this.cartValueArr));
        }
        this.router.navigate(['/cart']);
      }
      else {
        this.router.navigate(['/cart']);
      }
    }
  }
}

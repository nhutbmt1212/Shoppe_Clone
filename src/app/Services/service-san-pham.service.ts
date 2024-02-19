import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { response } from 'express';
import { Observable, from, map } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class ServiceSanPhamService {
  MaNguoiDung: string = '';
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  laySanPham(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const helper = new JwtHelperService();
      if (token) {
        const decodedToken = helper.decodeToken(token);
        this.MaNguoiDung = decodedToken.results[0].MaNguoiDung;

      }
    }

    return from(
      fetch('http://localhost:4000/sanpham').then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
    ).pipe(
      map((data: any[]) => data.filter((item: any) =>
        item.TinhTrang !== "Đã Xóa" && item.MaNguoiDung === this.MaNguoiDung))
    );

  }

  laySanPhamHome(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const helper = new JwtHelperService();
      if (token) {
        const decodedToken = helper.decodeToken(token);
        this.MaNguoiDung = decodedToken.results[0].MaNguoiDung;

      }
    }



    return from(
      fetch('http://localhost:4000/sanpham').then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
    ).pipe(
      map((data: any[]) => data.filter((item: any) =>
        item.TinhTrang !== "Đã Xóa" && item.MaNguoiDung !== this.MaNguoiDung))
    );

  }

  randomMa(): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 6;
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result.toLocaleUpperCase();
  }
  laySPTheoId(MaSanPham: string): Observable<any> {
    return from(
      fetch(`http://localhost:4000/sanpham/${MaSanPham}`).then((response) => {
        if (!response.ok) {

          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
    );
  }
  LayHinhAnhTheoMaSanPham(MaSanPham: string): Observable<any> {
    return from(
      fetch(`http://localhost:4000/hinhanh/${MaSanPham}`).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
    );
  }
  LayHinhAnhTheoMaSanPhamLimit1(MaSanPham: string): Observable<any> {
    return from(
      fetch(`http://localhost:4000/layhinhanhdautien/${MaSanPham}`).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
    );
  }

}

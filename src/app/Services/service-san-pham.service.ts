import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceSanPhamService {
  laySanPham(): Observable<any> {
    return from(
      fetch('http://localhost:4000/sanpham').then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
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

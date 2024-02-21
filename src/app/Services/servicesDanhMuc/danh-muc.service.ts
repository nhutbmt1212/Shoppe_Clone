import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DanhMucService {

  layDanhMuc(): Observable<any> {
    return from(fetch('http://localhost:4000/danhmuc')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      }));
  }
  layDanhMucTheoId(MaDanhMuc: string): Observable<any> {
    return from(
      fetch(`http://localhost:4000/danhmuc/${MaDanhMuc}`).then((response) => {
        if (!response.ok) {

          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
    );
  }
  LayHinhAnhTheoMaSanPhamLimit1(MaDanhMuc: string): Observable<any> {
    return from(
      fetch(`http://localhost:4000/layhinhanhdanhmucdautien/${MaDanhMuc}`).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
    );
  }
}

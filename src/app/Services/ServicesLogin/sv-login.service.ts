import { Injectable } from '@angular/core';
import { Observable, from, tap } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SvLoginService {

  login(Email: string, MatKhau: string): Observable<any> {
    const body = { Email, MatKhau };
    return from(fetch(`http://localhost:4000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((response) => {
      if (!response.ok) {
        // Trả về chuỗi thông báo lỗi
        return response.json();
      } else {
        return response.json();
      }
    }).then((data) => {
      localStorage.setItem('token', data.token);
      return data;
    }));
  }






}
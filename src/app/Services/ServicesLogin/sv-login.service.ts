import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, tap } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SvLoginService {
  private loginStatus = new BehaviorSubject<boolean>(false);
  currentStatus = this.loginStatus.asObservable();


  private titleStatus = new BehaviorSubject<boolean>(false);
  currentTitleStatus = this.titleStatus.asObservable();

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
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    }));
  }

  LayNguoiDung(): Observable<any> {
    return from(fetch('http://localhost:4000/nguoidung')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      }));
  }
  thayDoiLoginStatus(status: boolean) {
    this.loginStatus.next(status);
  }
  changeTitleLoginAndRegister(title: boolean) {
    this.titleStatus.next(title)
  }



}

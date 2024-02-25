import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, from } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userStatus = new BehaviorSubject<boolean>(false);
  currentStatus = this.userStatus.asObservable();
  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  LuuThongTin(data: any): Observable<any> {
    const url = `http://localhost:4000/nguoidung/${data.get('MaNguoiDung')}`;
    const fetchPromise = fetch(url, {
      method: 'PUT',
      body: data
    })
      .then(response => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });

    return from(fetchPromise);
  }
  DangXuatTK(status: boolean) {
    this.userStatus.next(status);
  }
  LayUserTheoMa(MaNguoiDung: string): Observable<any> {
    const response = fetch(`http://localhost:4000/laynguoidungtheoid/${MaNguoiDung}`, {
      method: 'GET',

    });

    return from(response.then(res => res.json()));
  }
  async CheckSdt(sdt: string, maNguoiDung: string): Promise<boolean> {
    try {
      const response = await fetch(`http://localhost:4000/checkTrungSDT/${sdt}/${maNguoiDung}`, {
        method: 'GET',
      });

      const result = await response.json();


      return Boolean(result.exists);
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  async CheckCccd(cccd: string, maNguoiDung: string): Promise<boolean> {
    try {
      const response = await fetch(`http://localhost:4000/checkTrungCCCD/${cccd}/${maNguoiDung}`, {
        method: 'GET',
      });

      const result = await response.json();
      return Boolean(result.exists);
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  async CheckEmail(email: string, maNguoiDung: string): Promise<boolean> {
    try {
      const response = await fetch(`http://localhost:4000/checkTrungEmail/${email}/${maNguoiDung}`, {
        method: 'GET',
      });

      const result = await response.json();
      return Boolean(result.exists);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

}

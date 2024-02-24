import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

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
}

import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
  NguoiDung: any = {};
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const helper = new JwtHelperService();
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = helper.decodeToken(token);
        this.NguoiDung = decodedToken.results[0];
      }
    }
  }
  isObjectEmpty(obj: any): boolean {
    return Object.keys(obj).length !== 0;
  }
  DangXuat(NguoiDung: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.NguoiDung = {};
    }
    location.reload();
  }
}

import { Component, OnInit, PLATFORM_ID, Inject, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { ElementRef } from '@angular/core';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
  NguoiDung: any = {};
  TotalQuantityCart: number = 0;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastr: ToastrService,
    private router: Router,
    private element: ElementRef
  ) {

  }
  OnActive(event: any) {
    window.scroll(0, 0);
  }
  ngOnInit(): void {
    // this.router.events.subscribe((evt) => {
    //   if (!(evt instanceof NavigationEnd)) {
    //     return;
    //   }

    //   var scrollToTop = window.setInterval(function () {
    //     var pos = window.pageYOffset;
    //     if (pos > 0) {
    //       window.scrollTo(0, pos - 20); // how far to scroll on each step
    //     } else {
    //       window.clearInterval(scrollToTop);
    //     }
    //   }, 70); // how fast to scroll (this equals roughly 60 fps)
    // });


    if (isPlatformBrowser(this.platformId)) {
      this.TotalQuantityCart = 0;
      const helper = new JwtHelperService();
      const token = localStorage.getItem('token');
      const cart = localStorage.getItem('cart');

      if (token) {
        const decodedToken = helper.decodeToken(token);
        this.NguoiDung = decodedToken.results[0];

        if (cart && this.NguoiDung.MaNguoiDung) {
          let cartLength = JSON.parse(cart);
          for (let index = 0; index < cartLength.length; index++) {
            if (decodedToken.results[0].MaNguoiDung === cartLength[index].MaNguoiDung) {
              console.log(decodedToken.results[0].MaNguoiDung, cartLength[index].MaNguoiDung);
              this.TotalQuantityCart += 1;
            }

          }
        }
        else {

          this.TotalQuantityCart = 0;
        }
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

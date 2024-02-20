import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvLoginService } from '../Services/ServicesLogin/sv-login.service';
import { FormsModule } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  DoiTuongPath: any = {};
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.email,

    ]),
    matkhau: new FormControl('', [
      Validators.required,
      Validators.minLength(8)

    ]),

  });
  get email() {
    return this.loginForm.get('email');
  }
  get matkhau() {
    return this.loginForm.get('matkhau');
  }
  title_login: string = '';
  Email: string = 'nguoidung1@email.com';
  MatKhau: string = 'matkhau1';
  ngOnInit(): void {
    this.title_login = 'Đăng nhập';
  }
  constructor(
    private svLoginServices: SvLoginService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastr: ToastrService
  ) { }
  Login() {
    const email = this.loginForm.value.email || '';
    const matkhau = this.loginForm.value.matkhau || '';
    this.svLoginServices
      .login(email, matkhau)
      .subscribe((res: any[]) => {
        if ('message' in res) {
          this.loginForm.get('matkhau')?.setErrors({ incorrect: true });

          this.loginForm.get('matkhau')?.setErrors({ incorrect: true });
          this.toastr.error("Đăng nhập không thành công");

        } else {
          if (isPlatformBrowser(this.platformId)) {
            const token = localStorage.getItem('token');
            const path = localStorage.getItem('path');
            if (path === null) {
              this.toastr.success("Đăng nhập thành công");

              this.router.navigate(['/home']);
              return;
            }
            else if (path !== null) {
              this.DoiTuongPath = JSON.parse(path);
            }
            if (token && this.DoiTuongPath) {
              if (this.DoiTuongPath.id === '') {
                console.log('path có 1');
                this.toastr.success("Đăng nhập thành công");

                this.router.navigate([`/${this.DoiTuongPath.pagename}`]);
              } else {
                this.toastr.success("Đăng nhập thành công");

                this.router.navigate([`/${this.DoiTuongPath.pagename}/${this.DoiTuongPath.id}`]);
              }
            }
          }
        }
      });
  }

}



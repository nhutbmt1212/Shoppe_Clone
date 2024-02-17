import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvLoginService } from '../Services/ServicesLogin/sv-login.service';
import { FormsModule } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  title_login: string = '';
  Email: string = 'nguoidung1@email.com';
  MatKhau: string = 'matkhau1';
  ngOnInit(): void {
    this.title_login = 'Đăng nhập';
  }
  constructor(private svLoginServices: SvLoginService, private router: Router) {
  }
  Login() {
    this.svLoginServices.login(this.Email, this.MatKhau).subscribe((res: any[]) => {


      if ('message' in res) {
        console.log('Tk hoặc mk sai');

      }
      else {
        const token = localStorage.getItem('token');
        const helper = new JwtHelperService();
        if (token) {
          const decodedToken = helper.decodeToken(token);
          console.log(decodedToken.results[0].PhanQuyen);
          this.router.navigate(['/home']);
        }

      }


    });
  }


}



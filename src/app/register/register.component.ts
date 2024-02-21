import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from '../login/login.component';
import { SvLoginService } from '../Services/ServicesLogin/sv-login.service';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private toastr: ToastrService, private router: Router, private nguoiDungServives: SvLoginService
  ) { }
  title_register: string = '';
  email: string = '';
  isEmailSent = false;
  enteredOTP: number = 0;
  actualOTP: number = 0;
  isRegisterDisabled = false;
  stepTwoDisabled = false;
  showPassWord = false;
  matkhau: string = '';
  ngOnInit(): void {
    this.title_register = 'Đăng ký';
  }
  isValidEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onRegisterClick() {
    if (!this.isValidEmail(this.email) || this.email === '') {
      this.toastr.error('Email không hợp lệ', 'Đăng ký');
      return
    }
    let foundExist = false;
    this.nguoiDungServives.LayNguoiDung().subscribe((data: any[]) => {
      for (let index = 0; index < data.length; index++) {
        if (this.email === data[index].Email) {
          this.toastr.error('Email của bạn đã tồn tại', 'Đăng ký');
          foundExist = true;
          break;
        }


      }
      if (foundExist) {
        return;
      }
      else {
        const verificationCode = Math.floor(100000 + Math.random() * 900000); // generates a 6-digit number

        fetch('http://localhost:4000/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: this.email, verificationCode }),
        })
          .then(response => response.json())
          .then(data => {
            this.toastr.info('Vui lòng vào mail để lấy mã OTP.', 'Gửi mail thành công')
            this.isEmailSent = true;
            this.isRegisterDisabled = true;
            this.actualOTP = verificationCode;
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }

    })




  }
  onVerifyClick() {
    if (this.enteredOTP === this.actualOTP) {
      console.log('OTP verified successfully');
      this.stepTwoDisabled = true;
      this.showPassWord = true;

    } else {
      console.log('Incorrect OTP');
    }
  }
  DangKy() {
    if (this.matkhau !== '') {


      let MaNguoiDung = Math.floor(100000 + Math.random() * 900000).toString(); // generates a 6-digit number
      let PhanQuyen = 'user';

      fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: this.email, MatKhau: this.matkhau, MaNguoiDung, PhanQuyen }),
      })

        .then(data => {
          this.toastr.success('Đăng ký thành công', 'Đăng ký')
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    else {
      alert('Bạn chưa nhập mật khẩu');
    }

  }
}

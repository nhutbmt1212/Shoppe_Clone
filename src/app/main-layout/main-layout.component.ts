import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { ElementRef } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SvLoginService } from '../Services/ServicesLogin/sv-login.service';
import { Validators, FormGroup, FormControl, ReactiveFormsModule, FormGroupDirective, NgForm, ValidatorFn, AbstractControl, FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../Services/ServicesUser/user.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, MatStepperModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
  NguoiDung: any = {};
  TotalQuantityCart: number = 0;
  progressBar: boolean = false;
  firstFormGroup = new FormGroup({
    HoVaTen: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      this.noSpecialCharValidator(),
      this.noWhitespaceValidator()
    ]),
    SoDienThoai: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern(/^0[0-9]*$/)

    ]
    ),
  })
  noSpecialCharValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalidChar = /^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/.test(control.value);
      return invalidChar ? null : { 'invalidChar': { value: control.value } };
    };
  }

  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return !isWhitespace ? null : { 'whitespace': true };
    }
  }

  secondFormGroup = new FormGroup({
    DiaChi: new FormControl('', [Validators.required,
    Validators.required,
    Validators.minLength(4),
    this.noWhitespaceValidator()
    ]),
    CCCD: new FormControl('', [Validators.required,
    Validators.required,
    Validators.maxLength(12),
    Validators.minLength(12),
    Validators.pattern(/^(0|[1-9][0-9]*)$/),
    ])
  });
  get HoVaTen() {
    return this.firstFormGroup.get('HoVaTen');
  }
  get SoDienThoai() {
    return this.firstFormGroup.get('SoDienThoai');
  }
  get DiaChi() {
    return this.secondFormGroup.get('DiaChi');
  }
  get CCCD() {
    return this.secondFormGroup.get('CCCD');
  }
  matcher = new MyErrorStateMatcher();

  isLinear = true;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastr: ToastrService,
    private router: Router,
    private element: ElementRef,
    private loginSerivce: SvLoginService,
    private userServices: UserService,

  ) {

  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.TotalQuantityCart = 0;
      const helper = new JwtHelperService();
      const token = localStorage.getItem('token');
      const cart = localStorage.getItem('cart');

      if (token) {
        const decodedToken = helper.decodeToken(token);
        this.NguoiDung = decodedToken.results[0];
        console.log(this.NguoiDung);

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
  LuuThongTin() {
    const MaNguoiDung = this.NguoiDung.MaNguoiDung;
    const TenNguoiDung = this.firstFormGroup.value.HoVaTen;
    const SoDienThoai = this.firstFormGroup.value.SoDienThoai;
    const DiaChi = this.secondFormGroup.value.DiaChi;
    const CCCD = this.secondFormGroup.value.CCCD;
    const formData = new FormData();
    const body = { MaNguoiDung, TenNguoiDung, SoDienThoai, DiaChi, CCCD };


    fetch(`http://localhost:4000/nguoidung/${MaNguoiDung}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.toastr.success('Lưu thông tin thành công', 'Thông báo');

      })
      .catch((error) => {
        console.error('Error:', error);
      });
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

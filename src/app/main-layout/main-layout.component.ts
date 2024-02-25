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
import { Validators, FormGroup, FormControl, ReactiveFormsModule, FormGroupDirective, NgForm, ValidatorFn, AbstractControl, FormsModule, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../Services/ServicesUser/user.service';
import { MatSelectModule } from '@angular/material/select';
import { Observable, catchError, from, map, of } from 'rxjs';

interface GioiTinh {
  value: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatStepperModule, MatButtonModule,
    ReactiveFormsModule, FormsModule,
    MatSelectModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
  MatKhauMau: string = 'MatKhau';
  GioiTinh_value_select: GioiTinh[] = [
    { value: 'Nam' },
    { value: 'Nữ' }
  ]

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
    SoDienThoai: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern(/^0[0-9]*$/),
      ],
      asyncValidators: [this.checkSoDienThoai()],
      updateOn: 'change'
    }),
    GioiTinh: new FormControl('', Validators.required),
  })
  noSpecialCharValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalidChar = /^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/.test(control.value);
      return invalidChar ? null : { 'invalidChar': { value: control.value } };
    };
  }

  checkSoDienThoai(): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      if (control.value.length === 10) {
        try {
          const data: Boolean = await this.userServices.CheckSdt(control.value, this.NguoiDung.MaNguoiDung);


          return data ? { 'invalidPhoneNumber': true } : null;
        } catch (err) {
          console.error(err);
          return null;
        }
      } else {
        return null;
      }
    };
  }


  checkCCCD(): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      if (control.value.length === 12) {
        try {
          const data: boolean = await this.userServices.CheckCccd(control.value, this.NguoiDung.MaNguoiDung);
          return data ? { 'invalidCCCD': true } : null;
        } catch (err) {
          console.error(err);
          return null;
        }
      } else {
        return null;
      }
    };
  }
  checkEmail(): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      if (control.value.length >= 16) {
        try {
          const data: boolean = await this.userServices.CheckEmail(control.value, this.NguoiDung.MaNguoiDung);
          return data ? { 'invalidEmail': true } : null;
        } catch (err) {
          console.error(err);
          return null;
        }
      } else {
        return null;
      }
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
    CCCD: new FormControl('', {
      validators: [
        Validators.required,
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(12),
        Validators.pattern(/^(0|[1-9][0-9]*)$/),
      ],
      asyncValidators: [this.checkCCCD()],
      updateOn: 'change'
    }),

  });
  get HoVaTen() {
    return this.firstFormGroup.get('HoVaTen');
  }
  get GioiTinh() {
    return this.firstFormGroup.get('GioiTinh');
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
  ThongTinNguoiDung = new FormGroup({
    TenNguoiDung_ChiTiet: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      this.noSpecialCharValidator(),
      this.noWhitespaceValidator()
    ]),
    SoDienThoai_ChiTiet: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern(/^0[0-9]*$/),
      ],
      asyncValidators: [this.checkSoDienThoai()],
      updateOn: 'change'
    }),
    Email_ChiTiet: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(70),
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
      ],
      asyncValidators: [this.checkEmail()],
      updateOn: 'change'
    }),
    DiaChi_ChiTiet: new FormControl('', [
      Validators.required,
      Validators.minLength(4),

      this.noWhitespaceValidator()
    ]),
    GioiTinh_ChiTiet: new FormControl('', [
      Validators.required,
    ]),
    CCCD_ChiTiet: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(12),
        Validators.pattern(/^(0|[1-9][0-9]*)$/),
      ],
      asyncValidators: [this.checkCCCD()],
      updateOn: 'change'
    }),
    MatKhauChiTiet: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      this.noWhitespaceValidator()
    ]),
    QuyenHan_ChiTiet: new FormControl('', [

    ]),
  })
  get TenNguoiDung_ChiTiet() {
    return this.ThongTinNguoiDung.get('TenNguoiDung_ChiTiet');
  }

  get SoDienThoai_ChiTiet() {
    return this.ThongTinNguoiDung.get('SoDienThoai_ChiTiet');
  }

  get Email_ChiTiet() {
    return this.ThongTinNguoiDung.get('Email_ChiTiet');
  }

  get DiaChi_ChiTiet() {
    return this.ThongTinNguoiDung.get('DiaChi_ChiTiet');
  }

  get GioiTinh_ChiTiet() {
    return this.ThongTinNguoiDung.get('GioiTinh_ChiTiet');
  }

  get CCCD_ChiTiet() {
    return this.ThongTinNguoiDung.get('CCCD_ChiTiet');
  }

  get MatKhauChiTiet() {
    return this.ThongTinNguoiDung.get('MatKhauChiTiet');
  }

  get QuyenHan_ChiTiet() {
    return this.ThongTinNguoiDung.get('QuyenHan_ChiTiet');
  }

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
      this.userServices.currentStatus.subscribe(status => {
        if (status) {
          localStorage.removeItem('token');
          this.NguoiDung = {};
          this.userServices.DangXuatTK(false)
        }
        else {
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

      })

    }
    this.ThongTinNguoiDung.controls['MatKhauChiTiet'].setValue(this.MatKhauMau);
  }
  LuuThongTin() {

    const MaNguoiDung = this.NguoiDung.MaNguoiDung;
    const TenNguoiDung = this.firstFormGroup.value.HoVaTen;
    const SoDienThoai = this.firstFormGroup.value.SoDienThoai;
    const GioiTinh = this.firstFormGroup.value.GioiTinh;
    const DiaChi = this.secondFormGroup.value.DiaChi;
    const CCCD = this.secondFormGroup.value.CCCD;
    const formData = new FormData();
    const body = { MaNguoiDung, TenNguoiDung, SoDienThoai, GioiTinh, DiaChi, CCCD };


    fetch(`http://localhost:4000/nguoidung/${MaNguoiDung}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        this.toastr.success('Đã lưu thông tin của bạn', 'Thông báo');

        console.log(data);

      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }
  XemThongTinNguoiDung() {
    this.userServices.LayUserTheoMa(this.NguoiDung.MaNguoiDung).subscribe((data: any[]) => {
      this.ThongTinNguoiDung.controls['TenNguoiDung_ChiTiet'].setValue(data[0].TenNguoiDung);
      this.ThongTinNguoiDung.controls['SoDienThoai_ChiTiet'].setValue(data[0].SoDienThoai);
      this.ThongTinNguoiDung.controls['Email_ChiTiet'].setValue(data[0].Email);
      this.ThongTinNguoiDung.controls['DiaChi_ChiTiet'].setValue(data[0].DiaChi);
      this.ThongTinNguoiDung.controls['GioiTinh_ChiTiet'].setValue(data[0].GioiTinh);
      this.ThongTinNguoiDung.controls['CCCD_ChiTiet'].setValue(data[0].CCCD);
      this.ThongTinNguoiDung.controls['QuyenHan_ChiTiet'].setValue(data[0].PhanQuyen);

    })


  }
  ThayDoiThongTinNguoiDung() {
    const ObjNguoiDung = {
      MaNguoiDung: this.NguoiDung.MaNguoiDung,
      TenNguoiDung: this.ThongTinNguoiDung.value.TenNguoiDung_ChiTiet,
      SoDienThoai: this.ThongTinNguoiDung.value.SoDienThoai_ChiTiet,
      Email: this.ThongTinNguoiDung.value.Email_ChiTiet,
      DiaChi: this.ThongTinNguoiDung.value.DiaChi_ChiTiet,
      GioiTinh: this.ThongTinNguoiDung.value.GioiTinh_ChiTiet,
      CCCD: this.ThongTinNguoiDung.value.CCCD_ChiTiet,
      PhanQuyen: this.ThongTinNguoiDung.value.QuyenHan_ChiTiet,
      MatKhau: this.ThongTinNguoiDung.value.MatKhauChiTiet
    }

    if (this.ThongTinNguoiDung.value.MatKhauChiTiet !== 'MatKhau') {
      ObjNguoiDung.MatKhau = this.ThongTinNguoiDung.value.MatKhauChiTiet;
    }
    else {
      ObjNguoiDung.MatKhau = null;
    }
    fetch(`http://localhost:4000/clientthaynguoidung/${this.NguoiDung.MaNguoiDung}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ObjNguoiDung)
    })
      .then(response => response.json())
      .then(data => {
        this.toastr.success('Đã lưu thông tin của bạn', 'Thông báo');

        console.log(data);

      })
      .catch((error) => {
        console.error('Error:', error);
      });


  }

  isObjectEmpty(obj: any): boolean {
    return Object.keys(obj).length !== 0;
  }
  DangXuat(NguoiDung: any) {

    this.userServices.DangXuatTK(true)
    this.toastr.success('Đã đăng xuất tài khoản của bạn', 'Thông báo');

  }
}

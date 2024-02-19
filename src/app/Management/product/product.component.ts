import { AfterViewInit, Component, OnInit, Inject, PLATFORM_ID, ElementRef, ViewChild, Input } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { ServiceSanPhamService } from '../../Services/service-san-pham.service';
import { DanhMucService } from '../../Services/servicesDanhMuc/danh-muc.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormControl, Validator, AbstractControl } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})

export class ProductComponent implements OnInit {
  pageid: any;
  SanPham: any[] = [];
  DanhMuc: any[] = [];
  imageUrlEdit: any[] = [];
  HinhAnhSanPham: any[] = [];
  selectedFile: FileList | null = null;
  MaSanPham: string = '';

  //xóa
  MaSanPhamXoa: string = ''

  //validate

  //page
  totalPages: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 2;
  pagedItems: any[] = [];

  constructor(
    private sanPhamServices: ServiceSanPhamService,
    private danhMucServices: DanhMucService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object

  ) {

  }
  ThemSanPhamForm = new FormGroup({
    MaSanPhamThem: new FormControl(''),
    MaDanhMucThem: new FormControl('',
      Validators.required,
    ),
    TenSanPhamThem: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/),

    ]),
    SoLuongThem: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    DonViTinhThem: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/),
    ]),
    DonGiaThem: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    HangThem: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/),


    ]),
    GiamGiaThem: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    MoTaThem: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    HinhAnhThem: new FormControl('', [
      Validators.required,
    ]),



  });
  get TenSanPhamThem() {
    return this.ThemSanPhamForm.get('TenSanPhamThem');
  }
  get SoLuongThem() {
    return this.ThemSanPhamForm.get('SoLuongThem');
  }
  get DonViTinhThem() {
    return this.ThemSanPhamForm.get('DonViTinhThem');
  }
  get DonGiaThem() {
    return this.ThemSanPhamForm.get('DonGiaThem');
  }
  get HangThem() {
    return this.ThemSanPhamForm.get('HangThem');
  }
  get GiamGiaThem() {
    return this.ThemSanPhamForm.get('GiamGiaThem');
  }
  get MoTaThem() {
    return this.ThemSanPhamForm.get('MoTaThem');
  }
  get MaDanhMucThem() {
    return this.ThemSanPhamForm.get('MaDanhMucThem');
  }
  get HinhAnhThem() {
    return this.ThemSanPhamForm.get('HinhAnhThem');
  }


  SuaSanPhamForm = new FormGroup({
    MaSanPhamSua: new FormControl(''),
    MaDanhMucSua: new FormControl('',
      Validators.required,
    ),
    TenSanPhamSua: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/),

    ]),
    SoLuongSua: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    DonViTinhSua: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/),
    ]),
    DonGiaSua: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    HangSua: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/),


    ]),
    GiamGiaSua: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    MoTaSua: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),


    TinhTrangSua: new FormControl('', [
      Validators.required,
    ]),
    MaNguoiDungSua: new FormControl('', [
    ]),

    NgayThemSua: new FormControl('', [
    ]),
  });

  get TenSanPhamSua() {
    return this.SuaSanPhamForm.get('TenSanPhamSua');
  }
  get SoLuongSua() {
    return this.SuaSanPhamForm.get('SoLuongSua');
  }
  get DonViTinhSua() {
    return this.SuaSanPhamForm.get('DonViTinhSua');
  }
  get DonGiaSua() {
    return this.SuaSanPhamForm.get('DonGiaSua');
  }
  get HangSua() {
    return this.SuaSanPhamForm.get('HangSua');
  }
  get GiamGiaSua() {
    return this.SuaSanPhamForm.get('GiamGiaSua');
  }
  get MoTaSua() {
    return this.SuaSanPhamForm.get('MoTaSua');
  }
  get MaDanhMucSua() {
    return this.SuaSanPhamForm.get('MaDanhMucSua');
  }

  get NgayThemSua() {
    return this.SuaSanPhamForm.get('NgayThemSua');
  }
  get MaNguoiDungSua() {
    return this.SuaSanPhamForm.get('MaNguoiDungSua');
  }
  get TinhTrangSua() {
    return this.SuaSanPhamForm.get('TinhTrangSua');
  }


  ngOnInit(): void {

    this.getDataSanPhamVaDanhMuc();
  }
  getDataSanPhamVaDanhMuc() {
    this.sanPhamServices.laySanPham().subscribe((data: any[]) => {

      this.SanPham = data;
      for (let i = 0; i < data.length; i++) {
        this.sanPhamServices.LayHinhAnhTheoMaSanPhamLimit1(data[i].MaSanPham).subscribe((res: any[]) => {
          this.SanPham[i].HinhAnhDauTien = res[0].TenFileAnh
        });
      }
      for (let i = 0; i < data.length; i++) {
        let ngayThem: Date = new Date(data[i].NgayThem);
        let year: string = ngayThem.getFullYear().toString();
        let month: string = (ngayThem.getMonth() + 1).toString().padStart(2, '0'); // padStart để thêm số 0 phía trước nếu tháng chỉ có 1 chữ số
        let date: string = ngayThem.getDate().toString().padStart(2, '0'); // tương tự như trên
        let hours: string = ngayThem.getHours().toString().padStart(2, '0');
        let minutes: string = ngayThem.getMinutes().toString().padStart(2, '0');
        let NgayGioConvert: string = `${year}-${month}-${date}T${hours}:${minutes}`;
        this.SanPham[i].NgayThem = NgayGioConvert;
      }
      this.totalPages = Math.ceil(this.SanPham.length / this.itemsPerPage);
      this.goToPage(1);

    })

    this.danhMucServices.layDanhMuc().subscribe((data: any[]) => {
      this.DanhMuc = data;

    });
  }
  goToPage(page: number) {
    this.currentPage = page;
    this.pagedItems = this.SanPham.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  inputFileAnh(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const extension = files[i].name.split('.').pop().toLowerCase();
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
      if (!imageExtensions.includes(extension)) {
        alert('Vui lòng chỉ chọn tệp ảnh!');
        event.target.value = null; // Xóa tất cả các tệp đã chọn
        this.ThemSanPhamForm.controls['HinhAnhThem'].setErrors({ 'require': true });
        return;
      }
    }
    this.selectedFile = files;

  }


  ThayDoiMaRandom() {
    //comment tạm đợi thêm sản phẩm xong
    const MaRandom = this.sanPhamServices.randomMa();
    // this.MaSanPham = MaRandom;
    this.ThemSanPhamForm.controls['MaSanPhamThem'].setValue(MaRandom);

  }


  async ThemSanPham() {


    try {
      if (isPlatformBrowser(this.platformId)) {

        const token = localStorage.getItem('token');
        if (token) {
          const helper = new JwtHelperService();
          const decode = helper.decodeToken(token)


          let ngayThem: Date = new Date;

          let year: string = ngayThem.getFullYear().toString();
          let month: string = (ngayThem.getMonth() + 1).toString().padStart(2, '0'); // padStart để thêm số 0 phía trước nếu tháng chỉ có 1 chữ số
          let date: string = ngayThem.getDate().toString().padStart(2, '0'); // tương tự như trên
          let hours: string = ngayThem.getHours().toString().padStart(2, '0');
          let minutes: string = ngayThem.getMinutes().toString().padStart(2, '0');

          let NgayGioConvert: string = `${year}-${month}-${date}T${hours}:${minutes}`;


          const newProduct = {
            MaSanPham: this.ThemSanPhamForm.value.MaSanPhamThem,
            TenSanPham: this.ThemSanPhamForm.value.TenSanPhamThem,
            NgayThem: NgayGioConvert,
            MaDanhMuc: this.ThemSanPhamForm.get('MaDanhMucThem')?.value,
            DonGia: this.ThemSanPhamForm.value.DonGiaThem,
            SoLuong: this.ThemSanPhamForm.value.SoLuongThem,
            DonViTinh: this.ThemSanPhamForm.value.DonViTinhThem,
            Hang: this.ThemSanPhamForm.value.HangThem,
            TinhTrang: 'Còn Hàng',
            GiamGia: this.ThemSanPhamForm.value.GiamGiaThem,
            MoTa: this.ThemSanPhamForm.value.MoTaThem,
            MaNguoiDung: decode.results[0].MaNguoiDung,

          };

          const response = await fetch('http://localhost:4000/sanpham', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          } else {
            console.log(response);
          }
          if (this.selectedFile) {
            const countFile = this.selectedFile.length;
            const formDataImg = new FormData();
            for (let i = 0; i < countFile; i++) {
              formDataImg.append('files', this.selectedFile[i]);
            }
            try {
              const response = await fetch("http://localhost:4000/multifiles", {
                method: 'POST',
                body: formDataImg
              });
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              } else {

                const formData = new FormData();
                for (let i = 0; i < countFile; i++) {
                  const DataHinhAnhSanPham = {
                    MaSanPham: this.ThemSanPhamForm.value.MaSanPhamThem,
                    TenFileAnh: this.selectedFile[i].name
                  }
                  console.log(DataHinhAnhSanPham);

                  if (this.ThemSanPhamForm.value.MaSanPhamThem) {
                    this.HinhAnhSanPham.push(DataHinhAnhSanPham);
                    formData.append('files', this.selectedFile[i]);
                    formData.append('MaSanPham', this.ThemSanPhamForm.value.MaSanPhamThem);
                  }

                }
                console.log(this.HinhAnhSanPham);
                const response = await fetch('http://localhost:4000/hinhanh', {
                  method: "POST",
                  body: formData
                });
                this.getDataSanPhamVaDanhMuc();
              }
            }
            catch (error) {
              console.error('There was a problem with the fetch operation: ', error);
            }
          }
        }
      }
    } catch (error) {
      console.error('An error occurred while adding the product:', error);
    }
  }

  SuaSanPham(MaSP: string) {
    this.sanPhamServices.laySPTheoId(MaSP).subscribe((data: any[]) => {
      let ngayThem: Date = new Date(data[0].NgayThem);

      let year: string = ngayThem.getFullYear().toString();
      let month: string = (ngayThem.getMonth() + 1).toString().padStart(2, '0'); // padStart để thêm số 0 phía trước nếu tháng chỉ có 1 chữ số
      let date: string = ngayThem.getDate().toString().padStart(2, '0'); // tương tự như trên
      let hours: string = ngayThem.getHours().toString().padStart(2, '0');
      let minutes: string = ngayThem.getMinutes().toString().padStart(2, '0');

      let NgayGioConvert: string = `${year}-${month}-${date}T${hours}:${minutes}`;

      this.SuaSanPhamForm.patchValue({
        MaSanPhamSua: data[0].MaSanPham,
        TenSanPhamSua: data[0].TenSanPham,
        SoLuongSua: data[0].SoLuong,
        DonGiaSua: data[0].DonGia,
        DonViTinhSua: data[0].DonViTinh,
        MaDanhMucSua: data[0].MaDanhMuc,
        HangSua: data[0].Hang,
        GiamGiaSua: data[0].GiamGia,
        MoTaSua: data[0].MoTa,
        MaNguoiDungSua: data[0].MaNguoiDung,
        NgayThemSua: NgayGioConvert,
        TinhTrangSua: data[0].TinhTrang
      });
      this.LayHinhAnhFromServices(MaSP);
    });
  }

  async ExecSuaSanPham() {
    let updateProduct = {
      MaSanPham: this.SuaSanPhamForm.value.MaSanPhamSua,
      TenSanPham: this.SuaSanPhamForm.value.TenSanPhamSua,
      SoLuong: this.SuaSanPhamForm.value.SoLuongSua,
      DonGia: this.SuaSanPhamForm.value.DonGiaSua, // Lưu trữ dưới dạng số thực
      DonViTinh: this.SuaSanPhamForm.value.DonViTinhSua,
      MaDanhMuc: this.SuaSanPhamForm.value.MaDanhMucSua,
      Hang: this.SuaSanPhamForm.value.HangSua,
      GiamGia: this.SuaSanPhamForm.value.GiamGiaSua,
      MoTa: this.SuaSanPhamForm.value.MoTaSua,
      MaNguoiDung: this.SuaSanPhamForm.value.MaNguoiDungSua,
      NgayThem: this.SuaSanPhamForm.value.NgayThemSua,
      TinhTrang: this.SuaSanPhamForm.value.TinhTrangSua
    };


    const response = await fetch(`http://localhost:4000/sanpham/${this.SuaSanPhamForm.value.MaSanPhamSua}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateProduct)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      this.getDataSanPhamVaDanhMuc();
      console.log("Update product successfully");
    }
  }


  LayHinhAnhFromServices(MaSP: string) {
    this.sanPhamServices.LayHinhAnhTheoMaSanPham(MaSP).subscribe((data: any[]) => {
      this.imageUrlEdit = data;
    });
  }
  async XoaHinhAnh(index: number) {
    const MaHinhAnh = this.imageUrlEdit[index].MaHinhAnh;
    this.imageUrlEdit.splice(index, 1);
    const response = await fetch(`http://localhost:4000/hinhanh/${MaHinhAnh}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Remove image error! status: ${response.status}`);
    } else {
      console.log(`Remove successfully`);
      this.getDataSanPhamVaDanhMuc();
    }
  }

  async UpLoadMultipleImg_Edit(event: any, MaSP: string) {
    const files: FileList = event.target.files;
    const formdata = new FormData();
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      formdata.append('files', element);

    }

    try {
      const response = await fetch('http://localhost:4000/multifiles', {
        method: 'POST',
        body: formdata,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      else {
        //lưu vào db
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          const DataHinhAnhSanPham = {
            //comment tạm đợi thêm sản phẩm xong
            // MaSanPham: this.MaSanPham,
            TenFileAnh: files[i].name
          }
          this.HinhAnhSanPham.push(DataHinhAnhSanPham);
          formData.append('files', files[i]);
          formData.append('MaSanPham', MaSP);
        }
        const response = await fetch('http://localhost:4000/hinhanh', {
          method: "POST",
          body: formData
        });
        //thực hiện thêm ảnh previewing
        if (response.ok) {

          this.LayHinhAnhFromServices(MaSP);
          this.getDataSanPhamVaDanhMuc();
        }



      }

    } catch (error) {
      console.error('There was a problem with the fetch operation: ', error);
    }



  }
  XoaSanPham(MaSP: string) {
    this.MaSanPhamXoa = MaSP;
  }
  async XacNhanXoaSP() {
    const response = await fetch(`http://localhost:4000/xoasanpham/${this.MaSanPhamXoa}`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error("Xóa sản phẩm thất bại");

    }
    console.log("Xóa sản phẩm thành công");
    this.getDataSanPhamVaDanhMuc();

  }

}

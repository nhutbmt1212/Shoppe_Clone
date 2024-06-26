import { AfterViewInit, Component, OnInit, Inject, PLATFORM_ID, ElementRef, ViewChild, Input } from '@angular/core';
import { FormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ServiceSanPhamService } from '../../Services/service-san-pham.service';
import { DanhMucService } from '../../Services/servicesDanhMuc/danh-muc.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormControl, Validator, AbstractControl } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule, CommonModule],
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
  itemsPerPage: number = 4;
  pagedItems: any[] = [];
  sortKey: string = '';
  sortDirection: string = '';
  searchTerm: string = '';

  constructor(
    private sanPhamServices: ServiceSanPhamService,
    private danhMucServices: DanhMucService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastr: ToastrService


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
      this.noWhitespaceValidator(),

    ]),
    SoLuongThem: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    DonViTinhThem: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/),
      this.noWhitespaceValidator(),
    ]),
    DonGiaThem: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    HangThem: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/),
      this.noWhitespaceValidator(),

    ]),
    GiamGiaThem: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    MoTaThem: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      this.noWhitespaceValidator(),
    ]),
    HinhAnhThem: new FormControl('', [
      Validators.required,
    ]),



  });
  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return !isWhitespace ? null : { 'whitespace': true };
    }
  }
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
      this.noWhitespaceValidator(),
    ]),
    SoLuongSua: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    DonViTinhSua: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/),
      this.noWhitespaceValidator(),
    ]),
    DonGiaSua: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    HangSua: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/),
      this.noWhitespaceValidator(),

    ]),
    GiamGiaSua: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    MoTaSua: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      this.noWhitespaceValidator(),
    ]),


    TinhTrangSua: new FormControl('', [
      Validators.required,
    ]),
    MaNguoiDungSua: new FormControl('', [
    ]),

    NgayThemSua: new FormControl('', [
    ]),
    HinhAnhSua: new FormControl('', [
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
  get HinhAnhSua() {
    return this.SuaSanPhamForm.get('HinhAnhSua');
  }
  get filteredItems() {
    if (this.searchTerm) {
      return this.pagedItems.filter(item =>
        Object.values(item).some((val: any) =>
          val.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    }

    return this.pagedItems;
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
  sortData(key: string) {
    if (this.sortKey === key) {
      // Đảo ngược hướng sắp xếp nếu đã sắp xếp theo khóa này
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Sắp xếp tăng dần nếu chưa sắp xếp theo khóa này
      this.sortKey = key;
      this.sortDirection = 'asc';
    }

    this.SanPham.sort((a, b) => {
      if (a[this.sortKey] < b[this.sortKey]) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (a[this.sortKey] > b[this.sortKey]) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    // Cập nhật trang hiện tại sau khi sắp xếp
    this.goToPage(this.currentPage);
  }
  // Trong component TypeScript của bạn
  get pages(): number[] {
    return Array.from({ length: Math.min(5, this.totalPages) }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.pagedItems = this.SanPham.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  inputFileAnh(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const extension = file.name.split('.').pop().toLowerCase();
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

      const fileSize = file.size;
      const maxFileSize = 10000000;

      if (fileSize > maxFileSize) {
        this.toastr.warning('Kích thước tệp quá lớn', 'Thêm ảnh');
        event.target.value = null;
        this.ThemSanPhamForm.controls['HinhAnhThem'].setErrors({ 'require': true });
        return;
      }

      if (!imageExtensions.includes(extension)) {
        this.toastr.warning('Vui lòng chọn tệp ảnh', 'Thêm ảnh');
        event.target.value = null; // Xóa tất cả các tệp đã chọn
        this.ThemSanPhamForm.controls['HinhAnhThem'].setErrors({ 'require': true });
        return;
      }

      let reader = new FileReader();
      reader.onloadend = (e) => {
        if (e.target && e.target.result instanceof ArrayBuffer) {
          let arr = (new Uint8Array(e.target.result)).subarray(0, 4);
          let header = "";
          for (let i = 0; i < arr.length; i++) {
            header += arr[i].toString(16);
          }
          // Check the signature against known image file signatures
          if (!["89504e47", "ffd8ffe0", "47494638"].includes(header)) {
            this.toastr.warning('Tệp không phải là ảnh', 'Thêm ảnh');
            event.target.value = null; // Xóa tất cả các tệp đã chọn
            this.ThemSanPhamForm.controls['HinhAnhThem'].setErrors({ 'require': true });
            return;
          }
        }
      };
      reader.readAsArrayBuffer(file);

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
            TenSanPham: this.ThemSanPhamForm.value.TenSanPhamThem?.trim(),
            NgayThem: NgayGioConvert,
            MaDanhMuc: this.ThemSanPhamForm.get('MaDanhMucThem')?.value,
            DonGia: this.ThemSanPhamForm.value.DonGiaThem,
            SoLuong: this.ThemSanPhamForm.value.SoLuongThem,
            DonViTinh: this.ThemSanPhamForm.value.DonViTinhThem?.trim(),
            Hang: this.ThemSanPhamForm.value.HangThem?.trim(),
            TinhTrang: 'Còn Hàng',
            GiamGia: this.ThemSanPhamForm.value.GiamGiaThem,
            MoTa: this.ThemSanPhamForm.value.MoTaThem?.trim(),
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
            // try {
            //   const response = await fetch("http://localhost:4000/multifiles", {
            //     method: 'POST',
            //     body: formDataImg
            //   });
            //   if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            //   } else {

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
            this.toastr.success('Thêm sản phẩm thành công', 'Thêm sản phẩm')
            this.getDataSanPhamVaDanhMuc();


            //   }
            // }
            // catch (error) {
            //   console.error('There was a problem with the fetch operation: ', error);
            // }
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
      TenSanPham: this.SuaSanPhamForm.value.TenSanPhamSua?.trim(),
      SoLuong: this.SuaSanPhamForm.value.SoLuongSua,
      DonGia: this.SuaSanPhamForm.value.DonGiaSua,
      DonViTinh: this.SuaSanPhamForm.value.DonViTinhSua?.trim(),
      MaDanhMuc: this.SuaSanPhamForm.value.MaDanhMucSua,
      Hang: this.SuaSanPhamForm.value.HangSua?.trim(),
      GiamGia: this.SuaSanPhamForm.value.GiamGiaSua,
      MoTa: this.SuaSanPhamForm.value.MoTaSua?.trim(),
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

      this.toastr.success('Sửa sản phẩm thành công', 'Sửa sản phẩm')
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
    if (this.imageUrlEdit.length > 1) {
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
    else {
      this.toastr.warning("Không thể xóa hết ảnh của một sản phẩm", "Thông báo");
    }


  }

  async UpLoadMultipleImg_Edit(event: any, MaSP: string) {
    const files: FileList = event.target.files;
    const formdata = new FormData();
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      const extension = element.name.split('.').pop()?.toLowerCase();
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
      if (extension && !imageExtensions.includes(extension)) {
        this.toastr.warning('Vui lòng chọn tệp ảnh', 'Sửa ảnh');
        event.target.value = null; // Xóa tất cả các tệp đã chọn
        this.SuaSanPhamForm.controls['HinhAnhSua'].setErrors({ 'require': true });
        return;
      }
      let reader = new FileReader();
      const fileReading = new Promise<void>((resolve, reject) => {
        reader.onloadend = (e) => {
          if (e.target && e.target.result instanceof ArrayBuffer) {
            let arr = (new Uint8Array(e.target.result)).subarray(0, 4);
            let header = "";
            for (let i = 0; i < arr.length; i++) {
              header += arr[i].toString(16);
            }
            // Check the signature against known image file signatures
            if (!["89504e47", "ffd8ffe0", "47494638"].includes(header)) {
              this.toastr.warning('Nội dung của file không phải là file ảnh', 'Thêm ảnh');
              event.target.value = null; // Xóa tất cả các tệp đã chọn
              this.SuaSanPhamForm.controls['HinhAnhSua'].setErrors({ 'require': true });
              reject();
            } else {
              resolve();
            }
          }
        };
      });

      reader.readAsArrayBuffer(element);
      try {
        await fileReading;
      } catch (error) {
        return;
      }
      formdata.append('files', element);
      console.log(element);
    }
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
    this.toastr.success('Xóa sản phẩm thành công', 'Xóa sản phẩm')

    console.log("Xóa sản phẩm thành công");
    this.getDataSanPhamVaDanhMuc();

  }

}

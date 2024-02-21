import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DanhMucService } from '../../Services/servicesDanhMuc/danh-muc.service';
import { ServiceSanPhamService } from '../../Services/service-san-pham.service';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  DanhMuc: any;
  selectedFile: any;
  selectedFileSua: any;
  InsertMaDanhMuc: string = '';
  constructor(private danhMucServices: DanhMucService,
    private sanPhamServices: ServiceSanPhamService
  ) { }
  ngOnInit(): void {

    this.loadDanhMuc();
  }

  loadDanhMuc() {
    this.danhMucServices.layDanhMuc().subscribe(data => {
      for (let index = 0; index < data.length; index++) {
        this.danhMucServices.LayHinhAnhTheoMaSanPhamLimit1(data[index].MaDanhMuc).subscribe(data => {
          data[index].HinhAnh = data[index].HinhAnh;
        })

      }

      this.DanhMuc = data;
      for (let i = 0; i < data.length; i++) {
        let ngayThem: Date = new Date(data[i].NgayThem);
        let year: string = ngayThem.getFullYear().toString();
        let month: string = (ngayThem.getMonth() + 1).toString().padStart(2, '0'); // padStart để thêm số 0 phía trước nếu tháng chỉ có 1 chữ số
        let date: string = ngayThem.getDate().toString().padStart(2, '0'); // tương tự như trên
        let hours: string = ngayThem.getHours().toString().padStart(2, '0');
        let minutes: string = ngayThem.getMinutes().toString().padStart(2, '0');
        let NgayGioConvert: string = `${year}-${month}-${date}T${hours}:${minutes}`;
        this.DanhMuc[i].NgayThem = NgayGioConvert;
      }
    })

    this.ThemDanhMucForm.controls['TinhTrangThem'].setValue('Đang hoạt động');
    let ngayThem: Date = new Date;

    let year: string = ngayThem.getFullYear().toString();
    let month: string = (ngayThem.getMonth() + 1).toString().padStart(2, '0'); // padStart để thêm số 0 phía trước nếu tháng chỉ có 1 chữ số
    let date: string = ngayThem.getDate().toString().padStart(2, '0'); // tương tự như trên
    let hours: string = ngayThem.getHours().toString().padStart(2, '0');
    let minutes: string = ngayThem.getMinutes().toString().padStart(2, '0');

    let NgayGioConvert: string = `${year}-${month}-${date}T${hours}:${minutes}`;
    this.ThemDanhMucForm.controls['NgayThemThem'].setValue(NgayGioConvert);
  }
  ThemDanhMucForm = new FormGroup({

    MaDanhMucThem: new FormControl('',
      Validators.required,
    ),
    TenDanhMucThem: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/),

    ]),
    NgayThemThem: new FormControl('',


    ),
    TinhTrangThem: new FormControl('', [
      Validators.required,
    ]),
    MoTaThem: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    HinhAnhThem: new FormControl('', [
      Validators.required,
    ]),




  });
  get MaDanhMucThem() {
    return this.ThemDanhMucForm.get('MaDanhMucThem');
  }
  get TenDanhMucThem() {
    return this.ThemDanhMucForm.get('TenDanhMucThem');
  }
  get NgayThemThem() {
    return this.ThemDanhMucForm.get('NgayThemThem');
  }
  get TinhTrangThem() {
    return this.ThemDanhMucForm.get('TinhTrangThem');
  }
  get MoTaThem() {
    return this.ThemDanhMucForm.get('MoTaThem');
  }
  get HinhAnhThem() {
    return this.ThemDanhMucForm.get('HinhAnhThem');
  }
  SuaDanhMucForm = new FormGroup({

    MaDanhMucSua: new FormControl('',
      Validators.required,
    ),
    TenDanhMucSua: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^[^\d~`!@#$%\^&*()_+=\-\[\]\\';,/{}|\\":<>\?]*$/),

    ]),
    NgayThemSua: new FormControl('', [
      Validators.required,
    ]),
    TinhTrangSua: new FormControl('', [
      Validators.required,

    ]),
    MoTaSua: new FormControl('', [
      Validators.required,
      Validators.minLength(4),

    ]),
    HinhAnhSua: new FormControl('', [

    ]),
  });

  get MaDanhMucSua() {
    return this.SuaDanhMucForm.get('MaDanhMucSua');
  }
  get TenDanhMucSua() {
    return this.SuaDanhMucForm.get('TenDanhMucSua');
  }
  get NgayThemSua() {
    return this.SuaDanhMucForm.get('NgayThemSua');
  }
  get TinhTrangSua() {
    return this.SuaDanhMucForm.get('TinhTrangSua');
  }
  get MoTaSua() {
    return this.SuaDanhMucForm.get('MoTaSua');
  }
  get HinhAnhSua() {
    return this.SuaDanhMucForm.get('HinhAnhSua');
  }





  inputFileAnh(event: any) {
    const file = event.target.files[0]; // Chỉ lấy tệp đầu tiên
    const extension = file.name.split('.').pop().toLowerCase();
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

    if (!imageExtensions.includes(extension)) {
      // this.toastr.warning('Vui lòng chọn tệp ảnh', 'Thêm ảnh');
      event.target.value = null;
      this.ThemDanhMucForm.controls['HinhAnhThem'].setErrors({ 'require': true });
      return;
    }

    this.selectedFile = file;
  }

  ThayDoiMaRandom() {
    const MaRandom = this.sanPhamServices.randomMa();
    this.ThemDanhMucForm.controls['MaDanhMucThem'].setValue(MaRandom);
  }
  ThemDanhMuc() {
    console.log(this.selectedFile.name);

    if (this.ThemDanhMucForm) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('MaDanhMuc', this.ThemDanhMucForm.value.MaDanhMucThem ?? '');
      formData.append('TenDanhMuc', this.ThemDanhMucForm.value.TenDanhMucThem ?? '');
      formData.append('NgayThem', this.ThemDanhMucForm.value.NgayThemThem ?? '');
      formData.append('TinhTrang', this.ThemDanhMucForm.value.TinhTrangThem ?? '');
      formData.append('MoTa', this.ThemDanhMucForm.value.MoTaThem ?? '');

      fetch('http://localhost:4000/danhmuc', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.error(error));

    }
    this.loadDanhMuc();
  }


  XacNhanXoaDanhMuc() {
    fetch('http://localhost:4000/xoadanhmuc/' + this.InsertMaDanhMuc, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.error(error));
    this.loadDanhMuc();
  }
  SuaDanhMuc(MaDM: string) {
    this.danhMucServices.layDanhMucTheoId(MaDM).subscribe((data: any[]) => {
      let ngayThem: Date = new Date(data[0].NgayThem);

      let year: string = ngayThem.getFullYear().toString();
      let month: string = (ngayThem.getMonth() + 1).toString().padStart(2, '0'); // padStart để thêm số 0 phía trước nếu tháng chỉ có 1 chữ số
      let date: string = ngayThem.getDate().toString().padStart(2, '0'); // tương tự như trên
      let hours: string = ngayThem.getHours().toString().padStart(2, '0');
      let minutes: string = ngayThem.getMinutes().toString().padStart(2, '0');

      let NgayGioConvert: string = `${year}-${month}-${date}T${hours}:${minutes}`;
      this.SuaDanhMucForm.patchValue({
        MaDanhMucSua: data[0].MaDanhMuc,
        TenDanhMucSua: data[0].TenDanhMuc,
        NgayThemSua: NgayGioConvert,
        TinhTrangSua: data[0].TinhTrang,
        MoTaSua: data[0].MoTa
      });
      // console.log(this.SuaDanhMucForm.value);


    })
  }
  ExecSuaDanhMuc() {
    if (this.SuaDanhMucForm) {
      const formData = new FormData();
      formData.append('MaDanhMuc', this.SuaDanhMucForm.value.MaDanhMucSua ?? '');
      formData.append('TenDanhMuc', this.SuaDanhMucForm.value.TenDanhMucSua ?? '');
      formData.append('NgayThem', this.SuaDanhMucForm.value.NgayThemSua ?? '');
      formData.append('TinhTrang', this.SuaDanhMucForm.value.TinhTrangSua ?? '');
      formData.append('MoTa', this.SuaDanhMucForm.value.MoTaSua ?? '');

      // Only append the file to the form data if it exists
      if (this.selectedFileSua) {
        console.log('ok');

        formData.append('file', this.selectedFileSua, this.selectedFileSua.name);
      }


      fetch('http://localhost:4000/danhmuc/' + this.SuaDanhMucForm.value.MaDanhMucSua, {
        method: 'PUT',
        body: formData,
      })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.error(error));






    }
    this.loadDanhMuc();
  }


  inputFileAnhSua(event: any) {
    const file = event.target.files[0]; // Chỉ lấy tệp đầu tiên
    const extension = file.name.split('.').pop().toLowerCase();
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

    if (!imageExtensions.includes(extension)) {
      // this.toastr.warning('Vui lòng chọn tệp ảnh', 'Thêm ảnh');
      event.target.value = null;
      this.ThemDanhMucForm.controls['HinhAnhThem'].setErrors({ 'require': true });
      return;
    }

    this.selectedFileSua = file;
  }

  XoaDanhMuc(MaDanhMuc: string) {

    this.InsertMaDanhMuc = MaDanhMuc;

  }

}

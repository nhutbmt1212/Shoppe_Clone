import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceSanPhamService } from '../../Services/service-san-pham.service';
import { DanhMucService } from '../../Services/servicesDanhMuc/danh-muc.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  SanPham: any[] = [];
  DanhMuc: any[] = [];
  imageUrlEdit: any[] = [];
  HinhAnhSanPham: any[] = [];
  MaSanPham: string = '';
  TenSanPham: string = '';
  SoLuong: number = 1;
  DonGia: number = 0;
  MoTa: string = '';
  Hang: string = '';
  MaDanhMuc: string = '';
  GiamGia: number = 0;
  MaNguoiDung: string = '';
  selectedFile: FileList | null = null;

  //sửa
  MaSanPhamSua: string = '';
  TenSanPhamSua: string = '';
  SoLuongSua: number = 1;
  DonGiaSua: number = 0;
  MoTaSua: string = '';
  HangSua: string = '';
  MaDanhMucSua: string = '';
  GiamGiaSua: number = 0;
  MaNguoiDungSua: string = '';
  NgayThemSua: any;
  TinhTrangSua: string = '';


  constructor(
    private sanPhamServices: ServiceSanPhamService,
    private danhMucServices: DanhMucService
  ) {

  }
  ngOnInit(): void {
    this.sanPhamServices.laySanPham().subscribe((data: any[]) => {
      this.SanPham = data;
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

    });
    this.danhMucServices.layDanhMuc().subscribe((data: any[]) => {
      this.DanhMuc = data;
      this.MaDanhMuc = data[0].MaDanhMuc;
    });
  }
  inputFileAnh(event: any) {
    this.selectedFile = event.target.files;
  }
  ThayDoiMaRandom() {
    const MaRandom = this.sanPhamServices.randomMa();
    this.MaSanPham = MaRandom;
  }


  async ThemSanPham() {
    try {
      this.MaNguoiDung = 'ND0001';
      let ngayThem: Date = new Date;

      let year: string = ngayThem.getFullYear().toString();
      let month: string = (ngayThem.getMonth() + 1).toString().padStart(2, '0'); // padStart để thêm số 0 phía trước nếu tháng chỉ có 1 chữ số
      let date: string = ngayThem.getDate().toString().padStart(2, '0'); // tương tự như trên
      let hours: string = ngayThem.getHours().toString().padStart(2, '0');
      let minutes: string = ngayThem.getMinutes().toString().padStart(2, '0');

      let NgayGioConvert: string = `${year}-${month}-${date}T${hours}:${minutes}`;


      const newProduct = {
        MaSanPham: this.MaSanPham,
        TenSanPham: this.TenSanPham,
        NgayThem: NgayGioConvert,
        MaDanhMuc: this.MaDanhMuc,
        DonGia: this.DonGia,
        SoLuong: this.SoLuong,
        Hang: this.Hang,
        TinhTrang: 'Còn Hàng',
        GiamGia: this.GiamGia,
        MoTa: this.MoTa,
        MaNguoiDung: this.MaNguoiDung,

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
                MaSanPham: this.MaSanPham,
                TenFileAnh: this.selectedFile[i].name
              }
              this.HinhAnhSanPham.push(DataHinhAnhSanPham);
              formData.append('files', this.selectedFile[i]);
              formData.append('MaSanPham', this.MaSanPham);
            }
            console.log(this.HinhAnhSanPham);
            const response = await fetch('http://localhost:4000/hinhanh', {
              method: "POST",
              body: formData
            });
          }
        }
        catch (error) {
          console.error('There was a problem with the fetch operation: ', error);
        }
      }
    } catch (error) {
      console.error('An error occurred while adding the product:', error);
    }
  }

  SuaSanPham(MaSP: string) {
    this.sanPhamServices.laySPTheoId(MaSP).subscribe((data: any[]) => {
      this.MaSanPhamSua = data[0].MaSanPham;
      this.TenSanPhamSua = data[0].TenSanPham;
      this.SoLuongSua = data[0].SoLuong;
      this.DonGiaSua = data[0].DonGia;
      this.MaDanhMucSua = data[0].MaDanhMuc;
      this.HangSua = data[0].Hang;
      this.GiamGiaSua = data[0].GiamGia;
      this.MoTaSua = data[0].MoTa;
      this.MaNguoiDungSua = data[0].MaNguoiDung;
      let ngayThem: Date = new Date(data[0].NgayThem);

      let year: string = ngayThem.getFullYear().toString();
      let month: string = (ngayThem.getMonth() + 1).toString().padStart(2, '0'); // padStart để thêm số 0 phía trước nếu tháng chỉ có 1 chữ số
      let date: string = ngayThem.getDate().toString().padStart(2, '0'); // tương tự như trên
      let hours: string = ngayThem.getHours().toString().padStart(2, '0');
      let minutes: string = ngayThem.getMinutes().toString().padStart(2, '0');

      let NgayGioConvert: string = `${year}-${month}-${date}T${hours}:${minutes}`;

      this.NgayThemSua = NgayGioConvert;


      this.TinhTrangSua = data[0].TinhTrang;
    });
    this.LayHinhAnhFromServices(MaSP);




  }
  async ExecSuaSanPham() {
    let updateProduct = {
      MaSanPham: this.MaSanPhamSua,
      TenSanPham: this.TenSanPhamSua,
      SoLuong: this.SoLuongSua.toString(),
      DonGia: this.DonGiaSua, // Lưu trữ dưới dạng số thực
      MaDanhMuc: this.MaDanhMucSua,
      Hang: this.HangSua,
      GiamGia: this.GiamGiaSua.toString(),
      MoTa: this.MoTaSua,
      MaNguoiDung: this.MaNguoiDungSua,
      NgayThem: this.NgayThemSua,
      TinhTrang: this.TinhTrangSua
    };
    const response = await fetch(`http://localhost:4000/sanpham/${this.MaSanPhamSua}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateProduct)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
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
            MaSanPham: this.MaSanPham,
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

        }



      }

    } catch (error) {
      console.error('There was a problem with the fetch operation: ', error);
    }



  }

}

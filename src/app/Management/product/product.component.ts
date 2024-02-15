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
      const NgayThem = new Date();
      const newProduct = {
        MaSanPham: this.MaSanPham,
        TenSanPham: this.TenSanPham,
        NgayThem: NgayThem,
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
      this.NgayThemSua = data[0].NgayThem;
      this.TinhTrangSua = data[0].TinhTrang;
    });
    this.sanPhamServices.LayHinhAnhTheoMaSanPham(MaSP).subscribe((data: any[]) => {
      console.log(data);
      this.imageUrlEdit = data;
    });
  }

}

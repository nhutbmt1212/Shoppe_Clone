import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ServiceSanPhamService } from '../../Services/service-san-pham.service';


@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent implements OnInit {
  MaSanPham: any;
  SanPham: any[] = [];
  MoTa: string = ''
  DonGia: number = 0;
  GiamGia: number = 0;
  DonGiaDaGiam: number = 0;
  SoLuong: number = 0;
  constructor(private activatedRoute: ActivatedRoute,
    private servicesSanPhamServices: ServiceSanPhamService) { }
  ngOnInit(): void {
    this.MaSanPham = this.activatedRoute.snapshot.paramMap.get('id');
    this.servicesSanPhamServices.laySPTheoId(this.MaSanPham).subscribe((data: any[]) => {
      console.log(data);
      this.SanPham = data
      this.MoTa = this.SanPham[0].MoTa;
      this.DonGia = this.SanPham[0].DonGia;
      this.GiamGia = this.SanPham[0].GiamGia;
      this.SoLuong = this.SanPham[0].SoLuong;



      this.DonGiaDaGiam = this.DonGia - (this.DonGia * this.GiamGia) / 100;

    });
  }
}



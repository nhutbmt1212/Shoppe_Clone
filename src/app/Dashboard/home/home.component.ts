import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceSanPhamService } from '../../Services/service-san-pham.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  SanPham: any[] = [];
  constructor(private sanPhamServices: ServiceSanPhamService) { }
  ngOnInit(): void {
    this.sanPhamServices.laySanPham().subscribe((data: any[]) => {
      this.SanPham = data;
      for (let index = 0; index < data.length; index++) {
        this.sanPhamServices.LayHinhAnhTheoMaSanPhamLimit1(data[index].MaSanPham).subscribe((res: any[]) => {
          this.SanPham[index].HinhAnhSP = res[0].TenFileAnh;
        });
      }
    })
  }
}

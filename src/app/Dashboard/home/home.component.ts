import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ServiceSanPhamService } from '../../Services/service-san-pham.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  SanPham: any[] = [];
  constructor(private sanPhamServices: ServiceSanPhamService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const pathKey = 'path';
      let pathValue = {
        pagename: 'home',
        id: ''
      }
      localStorage.setItem(pathKey, JSON.stringify(pathValue));
    }

    this.sanPhamServices.laySanPhamHome().subscribe((data: any[]) => {
      this.SanPham = data;
      for (let index = 0; index < data.length; index++) {
        this.sanPhamServices.LayHinhAnhTheoMaSanPhamLimit1(data[index].MaSanPham).subscribe((res: any[]) => {
          this.SanPham[index].HinhAnhSP = res[0].TenFileAnh;
        });
      }
    })
  }
}

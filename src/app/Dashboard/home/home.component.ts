import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ServiceSanPhamService } from '../../Services/service-san-pham.service';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { encode } from 'punycode';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalPages: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 18;
  pagedItems: any[] = [];
  SanPham: any[] = [];
  searchTerm: string = '';

  constructor(private sanPhamServices: ServiceSanPhamService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,


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
      this.totalPages = Math.ceil(this.SanPham.length / this.itemsPerPage);
      this.goToPage(1);
    })
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

  RedirectToDetal(MaSanPham: string) {
    let encodedString: string = encodeURIComponent(';q?ees3rs ' + MaSanPham + ' #@#%^d').toLocaleUpperCase();
    this.router.navigate(['detail/' + encodedString]);
  }
  get pages(): number[] {
    return Array.from({ length: Math.min(5, this.totalPages) }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.pagedItems = this.SanPham.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }
}

import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ServiceSanPhamService } from '../../Services/service-san-pham.service';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { encode } from 'punycode';
import { ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../Services/ServicesUser/user.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, MatInputModule, MatSelectModule,
    MatFormFieldModule, FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  giaCa = [
    { id: 1, GiaMin: 0, GiaMax: 1000000 },
    { id: 2, GiaMin: 1000000, GiaMax: 5000000 },
    { id: 3, GiaMin: 5000000, GiaMax: 500000000 },
  ];

  private _filteredItems: any[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 18;
  pagedItems: any[] = [];
  SanPham: any[] = [];
  searchTerm: string = '';
  selectedPriceRange: any; // Khai báo biến này để lưu giá trị được chọn
  selectedPriceRanges: any[] = []; // Khai báo một mảng để lưu trữ tất cả các lựa chọn

  constructor(private sanPhamServices: ServiceSanPhamService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private userServices: UserService,


  ) {
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const pathKey = 'path';
      let pathValue = {
        pagename: 'home',
        id: ''
      }
      localStorage.setItem(pathKey, JSON.stringify(pathValue));
    }

    this.fetchData();

    this.userServices.currentStatus.subscribe(status => {
      if (status) {
        location.reload();
      }
    })
  }

  fetchData(): void {
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
  delayedSearch() {
    setTimeout(() => {
      this.search();
    }, 0);
  }
  search(): void {
    let filteredProducts = [...this.SanPham]; // Create a new copy of SanPham

    if (this.searchTerm) {
      filteredProducts = filteredProducts.filter(sp => sp.TenSanPham.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }

    if (this.selectedPriceRange) {
      filteredProducts = filteredProducts.filter(sp => sp.DonGia >= this.selectedPriceRange.GiaMin && sp.DonGia <= this.selectedPriceRange.GiaMax);
    }

    this.totalPages = Math.ceil(filteredProducts.length / this.itemsPerPage);
    this.goToPage(1);
    this.pagedItems = filteredProducts.slice(0, this.itemsPerPage);
  }


}

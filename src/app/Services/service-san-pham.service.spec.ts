import { TestBed } from '@angular/core/testing';

import { ServiceSanPhamService } from './service-san-pham.service';

describe('ServiceSanPhamService', () => {
  let service: ServiceSanPhamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceSanPhamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

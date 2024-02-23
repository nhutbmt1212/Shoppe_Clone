import { TestBed } from '@angular/core/testing';

import { ScrollOnTopService } from './scroll-on-top.service';

describe('ScrollOnTopService', () => {
  let service: ScrollOnTopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollOnTopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { TravelPackageService } from './travel-package.service';

describe('TravelPackageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TravelPackageService]
    });
  });

  it('should be created', inject([TravelPackageService], (service: TravelPackageService) => {
    expect(service).toBeTruthy();
  }));
});

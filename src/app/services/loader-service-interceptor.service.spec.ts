import { TestBed, inject } from '@angular/core/testing';

import { LoaderServiceInterceptorService } from './loader-service-interceptor.service';

describe('LoaderServiceInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderServiceInterceptorService]
    });
  });

  it('should be created', inject([LoaderServiceInterceptorService], (service: LoaderServiceInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});

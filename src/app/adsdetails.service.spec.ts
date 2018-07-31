import { TestBed, inject } from '@angular/core/testing';

import { AdsdetailsService } from './adsdetails.service';

describe('AdsdetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdsdetailsService]
    });
  });

  it('should be created', inject([AdsdetailsService], (service: AdsdetailsService) => {
    expect(service).toBeTruthy();
  }));
});

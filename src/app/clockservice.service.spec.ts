import { TestBed, inject } from '@angular/core/testing';

import { ClockserviceService } from './clockservice.service';

describe('ClockserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClockserviceService]
    });
  });

  it('should be created', inject([ClockserviceService], (service: ClockserviceService) => {
    expect(service).toBeTruthy();
  }));
});

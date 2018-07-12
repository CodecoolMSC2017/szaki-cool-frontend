import { TestBed, inject } from '@angular/core/testing';

import { GreetingsService } from './greetings.service';

describe('GreetingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GreetingsService]
    });
  });

  it('should be created', inject([GreetingsService], (service: GreetingsService) => {
    expect(service).toBeTruthy();
  }));
});

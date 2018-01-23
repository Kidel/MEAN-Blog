import { TestBed, inject } from '@angular/core/testing';

import { HttpCallsService } from './http-calls.service';

describe('HttpCallsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpCallsService]
    });
  });

  it('should be created', inject([HttpCallsService], (service: HttpCallsService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { RestItemService } from './rest-item.service';

describe('RestItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestItemService]
    });
  });

  it('should be created', inject([RestItemService], (service: RestItemService) => {
    expect(service).toBeTruthy();
  }));
});

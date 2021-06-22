import { TestBed } from '@angular/core/testing';

import { SharedAuthTokenServiceService } from './shared-auth-token-service.service';

describe('SharedAuthTokenServiceService', () => {
  let service: SharedAuthTokenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedAuthTokenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

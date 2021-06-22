import { TestBed } from '@angular/core/testing';

import { CanActivateTeamService } from './can-activate-team.service';

describe('CanActivateTeamService', () => {
  let service: CanActivateTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { NotInstalledGuard } from './not-installed.guard';

describe('NotInstalledGuard', () => {
  let guard: NotInstalledGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotInstalledGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { InstalledGuard } from './installed.guard';

describe('InstalledGuard', () => {
  let guard: InstalledGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InstalledGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

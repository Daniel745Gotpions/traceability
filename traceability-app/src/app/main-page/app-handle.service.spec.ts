import { TestBed } from '@angular/core/testing';

import { AppHandleService } from './app-handle.service';

describe('AppHandleService', () => {
  let service: AppHandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppHandleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

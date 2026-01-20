import { TestBed } from '@angular/core/testing';

import { Speicher } from './speicher';

describe('Speicher', () => {
  let service: Speicher;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Speicher);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

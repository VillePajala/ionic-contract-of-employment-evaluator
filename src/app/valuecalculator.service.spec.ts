import { TestBed } from '@angular/core/testing';

import { ValuecalculatorService } from './valuecalculator.service';

describe('ValuecalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValuecalculatorService = TestBed.get(ValuecalculatorService);
    expect(service).toBeTruthy();
  });
});

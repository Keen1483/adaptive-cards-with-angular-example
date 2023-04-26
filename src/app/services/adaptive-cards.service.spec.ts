import { TestBed } from '@angular/core/testing';

import { AdaptiveCardsService } from './adaptive-cards.service';

describe('AdaptiveCardsService', () => {
  let service: AdaptiveCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdaptiveCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CanvasHelperService } from './canvas-helper.service';

describe('CanvasHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanvasHelperService = TestBed.get(CanvasHelperService);
    expect(service).toBeTruthy();
  });
});

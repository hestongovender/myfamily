import { TestBed } from '@angular/core/testing';

import { MyFamilyApiService } from './my-family-api.service';

describe('FamilyTreeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyFamilyApiService = TestBed.get(MyFamilyApiService);
    expect(service).toBeTruthy();
  });
});

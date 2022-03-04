import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyGamesComponent } from './family-games.component';

describe('FamilyGamesComponent', () => {
  let component: FamilyGamesComponent;
  let fixture: ComponentFixture<FamilyGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

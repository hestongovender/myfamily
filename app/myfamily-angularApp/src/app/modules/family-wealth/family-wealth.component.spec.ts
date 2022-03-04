import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyWealthComponent } from './family-wealth.component';

describe('FamilyWealthComponent', () => {
  let component: FamilyWealthComponent;
  let fixture: ComponentFixture<FamilyWealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyWealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyWealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

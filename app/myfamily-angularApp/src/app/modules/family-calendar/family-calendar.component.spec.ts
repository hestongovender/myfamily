import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyCalendarComponent } from './family-calendar.component';

describe('FamilyCalendarComponent', () => {
  let component: FamilyCalendarComponent;
  let fixture: ComponentFixture<FamilyCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

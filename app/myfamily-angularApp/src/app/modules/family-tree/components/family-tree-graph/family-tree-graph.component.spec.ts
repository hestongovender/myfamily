import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyTreeGraphComponent } from './family-tree-graph.component';

describe('FamilyTreeGraphComponent', () => {
  let component: FamilyTreeGraphComponent;
  let fixture: ComponentFixture<FamilyTreeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyTreeGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyTreeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

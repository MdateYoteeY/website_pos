import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPeopleComponent } from './report-people.component';

describe('ReportPeopleComponent', () => {
  let component: ReportPeopleComponent;
  let fixture: ComponentFixture<ReportPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

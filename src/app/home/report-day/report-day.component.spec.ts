import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDayComponent } from './report-day.component';

describe('ReportDayComponent', () => {
  let component: ReportDayComponent;
  let fixture: ComponentFixture<ReportDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

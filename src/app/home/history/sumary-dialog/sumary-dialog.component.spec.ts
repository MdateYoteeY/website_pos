import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumaryDialogComponent } from './sumary-dialog.component';

describe('SumaryDialogComponent', () => {
  let component: SumaryDialogComponent;
  let fixture: ComponentFixture<SumaryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumaryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SumaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

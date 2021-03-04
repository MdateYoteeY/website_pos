import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAddDialogComponent } from './stock-add-dialog.component';

describe('StockAddDialogComponent', () => {
  let component: StockAddDialogComponent;
  let fixture: ComponentFixture<StockAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

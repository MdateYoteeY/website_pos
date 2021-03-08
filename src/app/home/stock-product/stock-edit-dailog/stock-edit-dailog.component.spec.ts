import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockEditDailogComponent } from './stock-edit-dailog.component';

describe('StockEditDailogComponent', () => {
  let component: StockEditDailogComponent;
  let fixture: ComponentFixture<StockEditDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockEditDailogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockEditDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

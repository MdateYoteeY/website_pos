import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPromotionDialogComponent } from './list-promotion-dialog.component';

describe('ListPromotionDialogComponent', () => {
  let component: ListPromotionDialogComponent;
  let fixture: ComponentFixture<ListPromotionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPromotionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPromotionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

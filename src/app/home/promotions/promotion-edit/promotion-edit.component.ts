import { Promotions } from './../../../model/promotionitem';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { method } from 'src/app/model/model.model';
import { Products } from 'src/app/model/product';
import { environment } from 'src/environments/environment';
import { StockProductComponent } from '../../stock-product/page2.component';

@Component({
  selector: 'app-promotion-edit',
  templateUrl: './promotion-edit.component.html',
  styleUrls: ['./promotion-edit.component.scss']
})
export class PromotionEditComponent implements OnInit {


 promotionForm: FormGroup;
  subscriptions: Subscription[] = [];
  product: Products;
  promotion: Promotions;
  header: string;
  promotionAdd = true;
  dataarray = [];
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<StockProductComponent>,

    @Inject(MAT_DIALOG_DATA) public data: method
  ) {}

  getProduct() {
    this.http
      .get(`${environment.apiUrl}products`)
      .subscribe((res: Products) => {
        this.product = res;
        console.log(this.product);
      });
  }
  ngOnInit(): void {
    console.log(this.data);
    this.initForm();
    this.getProduct();

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  initForm(): void {
     this.promotionForm = this.fb.group({
       promotion_name: ['', Validators.required],
       promotion_discount: ['', Validators.required],
       date_start: ['', Validators.required],
       date_end: ['', Validators.required],
       promotion_item: this.fb.array([this.createItem()]),
     });

    if (this.data && this.data.stock) {
      this.promotionForm.patchValue(this.data.stock);

      const items = <FormArray>this.promotionForm.controls.promotion_item;

      for (const item of this.data.promotion.promotion_item) {
        items.push(this.createItem(item));
      }
    }

    console.log(this.promotionForm.value);
    // this.calculateTotalPrice();
  }

  editPromotion(id): void {
    this.http
      .get(`${environment.apiUrl}promotions/` + id)
      .subscribe((res: Promotions) => {
        this.promotion = res;
        console.log(this.promotion);
      });
  }

  initFormItems(): void {
    this.promotionForm = this.fb.group({
      stoct_list: this.fb.array([this.createItem()]),
    });
  }

  createItem(data?): FormGroup {
    const output = this.fb.group({
      product_id: ['', Validators.required],
    });

    if (data) {
      output.patchValue(data);
    }

    return output;
  }

  removeForm(index) {
    const items = <FormArray>this.promotionForm.get('promotion_item');
    console.log(items);
    items.removeAt(index);
  }

  // calculateTotalPrice(): void {
  //   this.subscriptions.push(
  //     this.Form.valueChanges
  //       .pipe(debounceTime(1000))
  //       .subscribe((change) => {
  //         const items = change.Item;

  //         console.log(items);

  //         const calculate = items.reduce(
  //           (state, value) => {
  //             state.price_all += value.price * value.list_amount;
  //             state.amount_all += value.list_amount;
  //             return state;
  //           },
  //           { price_all: 0, amount_all: 0 }
  //         );

  //         this.stockForm.patchValue(calculate, { emitEvent: false });
  //       })
  //   );
  // }

  onSubmit(): void {
    const payload = this.promotionForm.value;

    console.log(payload);
    this.http
      .post(`${environment.apiUrl}promotions`, { promotion: payload })
      .subscribe((res) => {
        console.log(res);
        this.dialogRef.close();
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}

function StockEditDailogComponent(
  StockEditDailogComponent: any,
  arg1: { data: { method: any; stock: any; product: any } }
) {
  throw new Error('Function not implemented.');
}

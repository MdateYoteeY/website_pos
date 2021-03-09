import { debounceTime } from 'rxjs/operators';
import { Products } from './../../../model/product';
import { StockList } from './../../../model/stock';

import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { method } from 'src/app/model/model.model';
import { environment } from 'src/environments/environment';
import { StockProductComponent } from '../page2.component';
import { Stocks } from 'src/app/model/stockproduct';
import { element } from 'protractor';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stock-dialog',
  templateUrl: './stock-dialog.component.html',
  styleUrls: ['./stock-dialog.component.scss'],
})
export class StockDialogComponent implements OnInit, OnDestroy {
  stockForm: FormGroup;
  subscriptions: Subscription[] = [];
  product: Products;
  stock: Stocks;
  header: string;
  stockAdd = true;
  stocklist: StockList;
  dataarray = [];
  stocklistForm: FormGroup;
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
    // if (this.data.method === 'showStock') {
    //   this.stockForm.patchValue(this.data.stock);
    //   this.header = 'รายการสินค้า';

    //   this.stockAdd = false;
    //   this.http
    //     .get(`${environment.apiUrl}stocks/` + this.data.stock.id)
    //     .subscribe((res: StockList) => {
    //       this.stocklist = res;
    //       console.log(this.stocklist);
    //     });
    // } else if (this.data.method === 'editStock') {
    //   this.header = 'แก้ไข';
    //   this.dataarray.push(this.stockForm);
    //   this.initForm();
    // }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  initForm(): void {
    this.stockForm = this.fb.group({
      id: [''],
      amount_all: ['', Validators.required],
      price_all: ['', Validators.required],
      stock_date: ['', Validators.required],
      Item: this.fb.array([]),
    });

    if (this.data && this.data.stock) {
      this.stockForm.patchValue(this.data.stock);

      const items = <FormArray>this.stockForm.controls.Item;

      for (const item of this.data.stock.Item) {
        items.push(this.createItem(item));
      }
    }

    console.log(this.stockForm.value);
    this.calculateTotalPrice();
  }

  editstock(id): void {
    this.http
      .get(`${environment.apiUrl}stoct_lists/` + id)
      .subscribe((res: StockList) => {
        this.stocklist = res;
        console.log(this.stocklist);
      });
  }

  initFormItems(): void {
    this.stocklistForm = this.fb.group({
      stoct_list: this.fb.array([this.createItem()]),
    });
  }

  createItem(data?): FormGroup {
    const output = this.fb.group({
      product_id: ['', Validators.required],
      price: ['', Validators.required],
      list_amount: ['', Validators.required],
    });

    if (data) {
      output.patchValue(data);
    }

    return output;
  }

  removeForm(index) {
    const items = <FormArray>this.stockForm.get('Item');
    console.log(items);
    items.removeAt(index);
  }

  calculateTotalPrice(): void {
    this.subscriptions.push(
      this.stockForm.valueChanges
        .pipe(debounceTime(1000))
        .subscribe((change) => {
          const items = change.Item;

          console.log(items);

          const calculate = items.reduce(
            (state, value) => {
              state.price_all += value.price * value.list_amount;
              state.amount_all += value.list_amount;
              return state;
            },
            { price_all: 0, amount_all: 0 }
          );

          this.stockForm.patchValue(calculate, { emitEvent: false });
        })
    );
  }

  onSubmit(): void {
    const payload = this.stockForm.value;

    console.log(payload);
    this.http
      .post(`${environment.apiUrl}stocks`, { stock: payload })
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

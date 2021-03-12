import { method } from 'src/app/model/model.model';
import { Products } from './../../../model/product';
import { Component, Inject, OnInit } from '@angular/core';
import { HistoryComponent } from '../history.component';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.scss'],
})
export class HistoryDialogComponent implements OnInit {
  orderForm: FormGroup;
  displayedColumns: string[] = [
    'id',
    'name',
    'type',
    'price',
    'amount',
    'status',
    'action',
  ];

  header: string;
  order: Orders[];
  product: Products[];
  dataSource = new MatTableDataSource<Orders>(ELEMENT_DATA);
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<HistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {}
  getOrder() {
    this.http
      .get(`${environment.apiUrl}orders/` + this.data.order)
      .subscribe((res: Orders[]) => {
        this.order = res;
      });
  }
  getProduct() {
    this.http
      .get(`${environment.apiUrl}products`)
      .subscribe((res: Products[]) => {
        this.product = res;
      });
  }
  initForm(): void {
    this.orderForm = this.fb.group({
      table_id: ['', Validators.required],
      receipt_id: ['', Validators.required],
      status_order_id: ['', Validators.required],
      store_id: ['', Validators.required],
      user_id: ['', Validators.required],
      order_number: ['', Validators.required],
      order_list: ['', Validators.required],
      order_amount: ['', Validators.required],
      table: ['', Validators.required],
      status: ['', Validators.required],
      staff: ['', Validators.required],
      zone: ['', Validators.required],
      store: ['', Validators.required],
      product_item: this.fb.array([]),
      promotion_item: this.fb.array([]),
      receipt: ['', Validators.required],
    });
    if (this.data && this.data.order) {
      this.orderForm.patchValue(this.data.order);

      const items = <FormArray>this.orderForm.controls.product_item;
      const promotion = <FormArray>this.orderForm.controls.promotion_item;

      for (const item of this.data.order.product_item) {
        items.push(this.productItem(item));
      }
      for (const item of this.data.order.promotion_item) {
        promotion.push(this.promotionItem(promotion));
      }
    }
  }
  productItem(data?): FormGroup {
    const output = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });

    if (data) {
      output.patchValue(data);
    }

    return output;
  }

  promotionItem(data?): FormGroup {
    const output = this.fb.group({
      price: ['', Validators.required],
      name: ['', Validators.required],
    });
    if (data) {
      output.patchValue(data);
    }

    return output;
  }

  ngOnInit(): void {
    this.initForm();
    // this.getOrder();
    this.getProduct();
    if (this.data.method === 'showOrder') {
      this.header = 'ฤกษ์เหล้า';
    }
    const payload = this.orderForm.value;

    console.log(payload);
    console.log(this.data.order.product_item);
  }

  onSubmit(): void {}

  close(): void {
    this.dialogRef.close();
  }
}



const ELEMENT_DATA: Orders[] = [];
 interface order {
   method?: String;
   order: Orders[];
 }
 interface Orders {
  id: number;
  table_id: number;
  receipt_id: number;
  status_order_id: number;
  store_id: number;
  user_id: number;
  order_number: string;
  order_list: number;
  order_amount: number;
  created_at: Date;
  updated_at: Date;
  table: string;
  status: string;
  staff: string;
  zone: string;
  store: string;
  product_item: ProductItem[];
  promotion_item: PromotionItem[];
  receipt: string;
}

 interface ProductItem {
  id: number;
  order_id: number;
  product_id: number;
  order_amount: number;
  total_price: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  price: number;
}

 interface PromotionItem {
  id: number;
  promotion_id: number;
  order_id: number;
  promotion_amount: number;
  Total_price: number;
  created_at: Date;
  updated_at: Date;
  name: string;
}




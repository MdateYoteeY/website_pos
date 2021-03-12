import { method } from 'src/app/model/model.model';
import { Products } from './../../../model/product';
import { Component, Inject, OnInit } from '@angular/core';
import { HistoryComponent } from '../history.component';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { Orders } from 'src/app/model/order';

@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.scss'],
})
export class HistoryDialogComponent implements OnInit {
  orderForm: FormGroup;
  product_list: FormGroup;
  items: FormArray;
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
  order: Orders;
  product: Products[];
  dataSource = new MatTableDataSource<Orders>(ELEMENT_DATA);

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<HistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getProduct();

    if (this.data.method === 'showOrder') {
      this.header = 'ฤกษ์เหล้า';
      const payload = this.orderForm.value;
      this.order = this.data.order;
      console.log(this.order);
    }
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
  }
  productItem(data?): FormGroup {
    return this.fb.group({
      order_id: ['', Validators.required],
      product_id: ['', Validators.required],
      order_amount: ['', Validators.required],
      total_price: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  onSubmit(): void {}

  close(): void {
    this.dialogRef.close();
  }
}

const ELEMENT_DATA: Orders[] = [];

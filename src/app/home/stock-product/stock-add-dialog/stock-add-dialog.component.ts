import { Products } from './../../../model/product';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { method } from 'src/app/model/model.model';
import { Stoctlistproduct } from 'src/app/model/stock';
import { Stocks } from 'src/app/model/stockproduct';
import { StockProductComponent } from '../page2.component';
import { PromotionList } from 'src/app/model/promotion';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-add-dialog',
  templateUrl: './stock-add-dialog.component.html',
  styleUrls: ['./stock-add-dialog.component.scss'],
})
export class StockAddDialogComponent implements OnInit {
  stocklistForm: FormGroup;
  dataarray = [];
  stock: Stocks;
  header: string;
  stockAdd = true;
  stocklistproduct: Stoctlistproduct[] = [];
  addstock: Stock;
  stoctlist: Stoctlist[] = [];
  items: FormArray;

  product: Products;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
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
    this.product = this.data.product;
    this.getProduct();
    //  this.http
    //    .post(`${environment.apiUrl}stocks`, { stock: payload })
    //    .subscribe((res) => {
    //      console.log(res);
    //      this.dialogRef.close();
    //    });

    if (this.data.method === 'addStock') {
      this.header = 'สต็อคสินค้า';
      console.log(this.stock);
      this.dataarray.push(this.stocklistproduct);
    }

    this.initForm();
  }

  initForm(): void {
    this.stocklistForm = this.fb.group({
      stoct_list: this.fb.array([this.createItem()]),
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      product_id: ['', Validators.required],
      price: ['', Validators.required],
      list_amount: ['', Validators.required],
    });
  }

  addForm() {
    this.items = this.stocklistForm.get('stoct_list') as FormArray;
    this.items.push(this.createItem());
  }

  removeForm(index) {
    this.items = this.stocklistForm.get('stoct_list') as FormArray;
    this.items.removeAt(index);
  }

  onSubmit(): void {
    if (this.stocklistForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด!',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const payload = this.stocklistForm.value;

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

interface RootObject {
  stock: Stock;
}

interface Stock {
  stoct_list: Stoctlist[];
}

interface Stoctlist {
  product_id: number;
  list_amount: number;
  price: number;
}

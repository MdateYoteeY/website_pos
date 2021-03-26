import { Products } from './../../../model/product';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { method } from 'src/app/model/model.model';
import { stocklistproduct } from 'src/app/model/stock';
import { Stocks } from 'src/app/model/stockproduct';
import { StockProductComponent } from '../page2.component';
import { PromotionList } from 'src/app/model/promotion';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

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
  stocklistproduct: stocklistproduct[] = [];
  addstock: Stock;
  stocklist: stocklist[] = [];
  items: FormArray;

  product: Products[];
  search = new FormControl();

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StockProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {}

  getProduct(params?: any) {
    this.http
      .get(`${environment.apiUrl}products_app`, { params })
      .subscribe((res: Products[]) => {
        this.product = res;
        console.log(this.product);
      });
  }

  ngOnInit(): void {
    this.getProduct();

    if (this.data.method === 'addStock') {
      this.header = 'สต็อคสินค้า';
      console.log(this.stock);
      this.dataarray.push(this.stocklistproduct);
    }
    // this.searchFunction();
    this.initForm();
  }

  searchFunction(): void {
    this.stocklistForm
      .get('stock_list')
      .valueChanges.pipe(debounceTime(500))
      .subscribe((val) => {
        this.getProduct({ keywords: val });
      });
  }

  initForm(): void {
    this.stocklistForm = this.fb.group({
      stock_list: this.fb.array([this.createItem()]),
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
    this.items = this.stocklistForm.get('stock_list') as FormArray;
    this.items.push(this.createItem());
  }

  removeForm(index) {
    this.items = this.stocklistForm.get('stock_list') as FormArray;
    this.items.removeAt(index);
  }

  onSubmit(): void {
    if (this.stocklistForm.invalid) {
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
  stock_list: stocklist[];
}

interface stocklist {
  product_id: number;
  list_amount: number;
  price: number;
}

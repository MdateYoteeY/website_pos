import { StockList } from './../../../model/stock';

import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { method } from 'src/app/model/model.model';
import { environment } from 'src/environments/environment';
import { StockProductComponent } from '../page2.component';
import { Stocks } from 'src/app/model/stockproduct';

@Component({
  selector: 'app-stock-dialog',
  templateUrl: './stock-dialog.component.html',
  styleUrls: ['./stock-dialog.component.scss']
})
export class StockDialogComponent implements OnInit {
  stockForm: FormGroup;

  stock: Stocks;
  header: string;
 stockAdd = true;
  stocklist: StockList;


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StockProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {
     this.stockForm = this.fb.group({
       id: [''],
      amount_all: ['', Validators.required],
      price_all: ['', Validators.required],
      stock_date: ['', Validators.required],
    });
   }

  ngOnInit(): void {


    if (this.data.method === 'editStock') {
      this.stockForm.patchValue(this.data.stock);
      this.header = 'รายการสินค้า';

      this.stockAdd = false;
      this.http.get(`${environment.apiUrl}stocks/`+this.data.stock.id).subscribe((res: StockList)=>{
        this.stocklist = res;
        console.log(this.stocklist);

      })
    } else if (this.data.method === 'addStock') {
      this.header = 'เพิ่มสินค้า';
    }
  }

  onSubmit(): void {
    // if (this.data.method === 'editStock') {
    //   let body = {
    //     product_name: this.stockForm.getRawValue().product_name,
    //     category_id: this.stockForm.getRawValue().category_id,
    //     product_price: this.stockForm.getRawValue().product_price,
    //     product_amount: this.stockForm.getRawValue().product_amount,

    //   };

    //   this.http
    //     .put(`${environment.apiUrl}products/` + this.data.product.id, {
    //       product: body,
    //     })
    //     .subscribe((res) => {
    //       console.log('Product updated!');
    //       this.dialogRef.close();
    //     });
    // } else if (this.data.method === 'addProduct') {
    //   // let id = this.tableForm.getRawValue().zone_id;
    //   // let zoneSelectName = '';

    //   // for (let i = 0; i < 3; i++) {
    //   //   if (this.zone[i].id === id) {
    //   //     console.log(this.zone[i].name_zone);
    //   //     zoneSelectName = this.zone[i].name_zone;
    //   //   }
    //   // }

    //   let body = {
    //     product_name:
    //       this.productForm.getRawValue().product_name,
    //       category_id: this.productForm.getRawValue().category_id,
    //       product_price: this.productForm.getRawValue().product_price,
    //       product_amount: this.productForm.getRawValue().product_amount,

    //   };

    //   this.http
    //     .post(`${environment.apiUrl}products`, { product: body })
    //     .subscribe((res) => {
    //       console.log('Product Added!');
    //       this.dialogRef.close();
    //     });
    // }
  }

  close(): void {
    this.dialogRef.close();
  }
}


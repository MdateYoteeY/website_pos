
import { StockList } from './../../../model/stock';

import { Categorys } from './../../../model/category';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { method } from 'src/app/model/model.model';
import { environment } from 'src/environments/environment';
import { TableComponent } from '../../table/table.component';
import { StatusProducts } from 'src/app/model/status';
import { ProductsComponent } from '../products.component';
import { Products } from 'src/app/model/product';
import { Types } from 'src/app/model/type';

@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrls: ['./products-dialog.component.scss']
})
export class ProductsDialogComponent implements OnInit {
  productForm: FormGroup;
  type: Types;
  product: Products;
  header: string;
  statusproduct: StatusProducts;
  productAdd = true;
  stock: StockList;


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {
    this.productForm = this.fb.group({
      id: [''],
      product_name: ['', Validators.required],
      type_id: ['', Validators.required],
      product_price: ['', Validators.required],
      product_amount: ['', Validators.required],
      product_status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.type = this.data.type;
    this.statusproduct = this.data.statusproduct;


    if (this.data.method === 'editProduct') {
      this.productForm.patchValue(this.data.product);
      this.header = 'แก้ไขสินค้า';

    } else if (this.data.method === 'addProduct') {
      this.header = 'เพิ่มสินค้า';
      this.productAdd = !this.productAdd;
    }
  }

  onSubmit(): void {
    if (this.data.method === 'editProduct') {
      let body = {
        product_name: this.productForm.getRawValue().product_name,
        type_id: this.productForm.getRawValue().type_id,
        product_price: this.productForm.getRawValue().product_price,
        product_amount: this.productForm.getRawValue().product_amount,

      };

      this.http
        .put(`${environment.apiUrl}products/` + this.data.product.id, {
          product: body,
        })
        .subscribe((res) => {
          console.log('Product updated!');
          this.dialogRef.close();
        });
    } else if (this.data.method === 'addProduct') {
      // let id = this.tableForm.getRawValue().zone_id;
      // let zoneSelectName = '';

      // for (let i = 0; i < 3; i++) {
      //   if (this.zone[i].id === id) {
      //     console.log(this.zone[i].name_zone);
      //     zoneSelectName = this.zone[i].name_zone;
      //   }
      // }

      let body = {
          product_name: this.productForm.getRawValue().product_name,
          type_id: this.productForm.getRawValue().type_id,
          product_price: this.productForm.getRawValue().product_price,
          // product_amount: this.productForm.getRawValue().product_amount,

        };




      this.http
        .post(`${environment.apiUrl}products`, { product: body })
        .subscribe((res) => {
          console.log('Product Added!');
          this.dialogRef.close();
        });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}


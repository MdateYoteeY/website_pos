import { Promotions } from './../../../model/promotionitem';
import { promotionitem } from './../../../model/promotion';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { method } from 'src/app/model/model.model';
import { Products } from 'src/app/model/product';
import { Stoctlistproduct } from 'src/app/model/stock';
import { Stocks } from 'src/app/model/stockproduct';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { StockProductComponent } from '../../stock-product/page2.component';
import { PromotionsComponent } from '../promotions.component';

@Component({
  selector: 'app-promotions-dialog',
  templateUrl: './promotions-dialog.component.html',
  styleUrls: ['./promotions-dialog.component.scss'],
})
export class PromotionsDialogComponent implements OnInit {
  promotionForm: FormGroup;
  dataarray = [];
  header: string;
  promotionAdd = true;
  promotion: Promotions[] = [];
  addpromotion: Promotions;
  promotionitem: Promotionitem[] = [];
  items: FormArray;
  productCheck = false;

  product: Products;
  products: Products[];

  displayedColumns: string[] = ['product'];
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PromotionsComponent>,
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

    if (this.data.method === 'addPromotion') {
      this.header = 'เพิ่มโปรโมชั่น';
      this.dataarray.push(this.promotion);
    } else if (this.data.method === 'editTable') {
      this.promotionForm.patchValue(this.data.promotion);
      this.header = 'แก้ไขโปรโมชั่น';
    }
    this.initForm();
  }

  initForm(): void {
    this.promotionForm = this.fb.group({
      promotion_name: ['', Validators.required],
      promotion_discount: ['', Validators.required],
      date_start: ['', Validators.required],
      date_end: ['', Validators.required],
      promotion_item: this.fb.array([this.createItem()]),
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      product_id: ['', Validators.required],
    });
  }

  addForm() {
    this.items = this.promotionForm.get('promotion_item') as FormArray;
    this.items.push(this.createItem());
  }

  removeForm(index) {
    this.items = this.promotionForm.get('promotion_item') as FormArray;
    this.items.removeAt(index);
  }

  onSubmit(): void {
    if (this.data.method === 'editPromotion') {
      if (this.promotionForm.invalid) {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด!',
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      const payload = this.promotionForm.value;

      console.log(payload);

      this.http
        .put(`${environment.apiUrl}promotions/` + this.data.promotion.id, {
          promotion: payload,
        })
        .subscribe((res) => {
          console.log(res);
          this.dialogRef.close();
        });
    }
    if (this.data.method === 'addPromotion') {
      if (this.promotionForm.invalid) {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด!',
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      const payload = this.promotionForm.value;

      console.log(payload);

      this.http
        .post(`${environment.apiUrl}promotions`, { promotion: payload })
        .subscribe((res) => {
          console.log(res);
          this.dialogRef.close();
        });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

interface Promotionitem {
  product_id: number;
}

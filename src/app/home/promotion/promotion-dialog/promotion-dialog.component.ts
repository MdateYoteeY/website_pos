import { Categorys } from './../../../model/category';
import { Products } from './../../../model/product';
import { method } from './../../../model/model.model';

import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-promotion-dialog',
  templateUrl: './promotion-dialog.component.html',
  styleUrls: ['./promotion-dialog.component.scss'],
})
export class PromotionDialogComponent implements OnInit {
  promotionAddForm: FormGroup;
  header = 'เพิ่มโปรโมชัน';
  productList: Products;
  categoryList: Categorys;
  constructor(
    private formBuilder: FormBuilder,

    private http: HttpClient,
    public dialogRef: MatDialogRef<PromotionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getProduct();
    this.getCategory();
  }

  createForm(): void {
    this.promotionAddForm = this.formBuilder.group({
      promotion_name: ['', Validators.required],
      promotion_discount: ['', Validators.required],
      date_start: ['', Validators.required],
      date_end: ['', Validators.required],
      productList: ['', Validators.required],
      categoryList: ['', Validators.required],
      img: [null],
    });
  }

  getProduct(): void {
    this.http
      .get(`${environment.apiUrl}products`)
      .subscribe((res: Products) => {
        this.productList = res;
        console.log(this.productList);
      });
  }

  getCategory(): void {
    this.http
      .get(`${environment.apiUrl}categories`)
      .subscribe((res: Categorys) => {
        this.categoryList = res;
        console.log(this.categoryList);
      });
  }

  onSubmit(): void {
    if (this.promotionAddForm.invalid) {
      return;
    }

    if (this.data.method === 'addPromotion') {
      let body = this.promotionAddForm.getRawValue();

      // let body = {
      //   promotion_name: this.promotionAddForm.getRawValue().promotion_name,
      //   promotion_discount: this.promotionAddForm.getRawValue().discount,
      //   date_start: this.promotionAddForm.getRawValue().start_date,
      //   date_end: this.promotionAddForm.getRawValue().end_date,
      //   img: null,
      // };

      this.http
        .post(`${environment.apiUrl}promotions`, { promotion: body })
        .subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'เพิ่มโปรโมชั่นสำเร็จ!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.dialogRef.close();
        });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

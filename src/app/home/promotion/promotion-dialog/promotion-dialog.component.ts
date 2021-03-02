import { PromotionList } from './../../../model/promotion';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { method } from 'src/app/model/model.model';
import { Promotion } from 'src/app/model/promotion';
import { StockList } from 'src/app/model/stock';
import { environment } from 'src/environments/environment';
import { StockProductComponent } from '../../stock-product/page2.component';
import { PromotionComponent } from '../promotion.component';

@Component({
  selector: 'app-promotion-dialog',
  templateUrl: './promotion-dialog.component.html',
  styleUrls: ['./promotion-dialog.component.scss']
})
export class PromotionDialogComponent implements OnInit {
  promotionForm: FormGroup;

  promotion: Promotion;
  header: string;
  promotionAdd = true;
  promotionlist: PromotionList;


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PromotionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {
     this.promotionForm = this.fb.group({
       id: [''],
      amount_all: ['', Validators.required],
      price_all: ['', Validators.required],
      stock_date: ['', Validators.required],
    });
   }

  ngOnInit(): void {
    this.http.get(`${environment.apiUrl}promotions/`+this.data.promotion.id).subscribe((res: PromotionList)=>{
      this.promotionlist = res;
      console.log(this.promotionlist);

    })

    if (this.data.method === 'editStock') {
      this.promotionForm.patchValue(this.data.promotion);
      this.header = 'แก้ไขโปรโมชั่น';
      this.promotionAdd = false;
    } else if (this.data.method === 'addPromotion') {
      this.header = 'เพิ่มโปรโมชั่น';
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


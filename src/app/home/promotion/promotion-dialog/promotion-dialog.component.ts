import { Types } from './../../../model/type';
import { Promotionitem } from './../../../model/promotion';
import { Categorys } from './../../../model/category';
import { Products } from './../../../model/product';
import { method } from './../../../model/model.model';

import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-promotion-dialog',
  templateUrl: './promotion-dialog.component.html',
  styleUrls: ['./promotion-dialog.component.scss'],
})
export class PromotionDialogComponent implements OnInit {
  promotionAddForm: FormGroup;
  header = 'เพิ่มโปรโมชัน';
  products: Products[];
  productList: Products[];
  promotionItem: Array<Products> = [];
  categoryList: Categorys;
  types: Types[];
  typeList: Types[];
  body = {};
  categoryValueCheck = false;
  productCheck = false;

  productSelected: Products;

  displayedColumns: string[] = ['id', 'product_name', 'action'];
  items: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<PromotionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {}
  dataSource = new MatTableDataSource<Products>(this.promotionItem);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.createForm();
    this.getProduct();
    this.getCategory();
    this.getType();
  }

  checkCateValue(event): void {
    if (event.value === 0) {
      this.categoryValueCheck = false;
      this.productList = this.products;
    } else {
      this.categoryValueCheck = true;

      this.typeList = this.types.filter((list) => {
        return (
          list.category_id ===
          this.promotionAddForm.controls['categoryList'].value
        );
      });

      this.productList = this.products.filter((list) => {
        return (
          list.category_id ===
          this.promotionAddForm.controls['categoryList'].value
        );
      });
    }
  }

  checkTypeValue(event, product: Products): void {
    if (event.value === 0) {
      this.productList = this.products.filter((list) => {
        return (
          list.category_id ===
          this.promotionAddForm.controls['categoryList'].value
        );
      });
    } else {
      this.productList = this.products.filter((list) => {
        return (
          list.type_id === this.promotionAddForm.controls['typeList'].value
        );
      });
    }
  }

  createForm(): void {
    this.promotionAddForm = this.formBuilder.group({
      promotion_name: ['', Validators.required],
      promotion_discount: ['', Validators.required],
      date_start: ['', Validators.required],
      date_end: ['', Validators.required],
      promotion_items: [this.formBuilder.array([]), Validators.required],
      categoryList: [''],
      typeList: [''],
      addProduct_id: ['', Validators.required],
      addPromotion_item_amount: ['', Validators.required],
      img: [null],
    });
  }

  createItem(data?: any): FormGroup {
    const result = this.formBuilder.group({
      product_id: [
        this.promotionAddForm.value.addProduct_id,
        Validators.required,
      ],
      promotion_item_amount: [
        this.promotionAddForm.value.addPromotion_item_amount,
        Validators.required,
      ],
    });

    if (data) {
      result.patchValue(data);
    }

    return result;
  }

  removeItem(index) {
    const items = <FormArray>this.promotionAddForm.get('promotion_items');
    console.log(items);
    items.removeAt(index);
  }

  getProduct(): void {
    this.http
      .get(`${environment.apiUrl}products`)
      .subscribe((res: Products[]) => {
        this.products = res;
      });
  }

  getType(): void {
    this.http.get(`${environment.apiUrl}types`).subscribe((res: Types[]) => {
      this.types = res;
    });
  }

  getCategory(): void {
    this.http
      .get(`${environment.apiUrl}categories`)
      .subscribe((res: Categorys) => {
        this.categoryList = res;
      });
  }

  addPromotionItem(): void {
    if (this.promotionAddForm.controls['productList'].invalid) {
      return;
    }

    this.items = <FormArray>this.promotionAddForm.get('promotion_items');
    this.items.push(this.createItem());
  }

  selectedProduct(item: Products): void {
    this.productSelected = item;
  }

  onSubmit(): void {
    if (this.promotionAddForm.invalid) {
      return;
    }

    if (this.data.method === 'addPromotion') {
      this.body = this.promotionAddForm.getRawValue();

      for (const item of this.data.promotion.promotion_items) {
        this.items.push(this.createItem(item));
      }

      this.http
        .post(`${environment.apiUrl}promotions`, { promotion: this.body })
        .subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'เพิ่มโปรโมชั่นสำเร็จ!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.dialogRef.close();
        });
    } else {
      this.body = this.promotionAddForm.getRawValue();

      for (const item of this.data.promotion.promotion_items) {
        this.items.push(this.createItem(item));
      }

      this.http
        .put(`${environment.apiUrl}promotions/` + this.data.promotion.id, {
          promotion: this.body,
        })
        .subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'แก้ไขโปรโมชั่นสำเร็จ!',
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

const ELEMENT_DATA: Products[] = [];

import { map } from 'rxjs/operators';
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
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrls: ['./products-dialog.component.scss'],
})
export class ProductsDialogComponent implements OnInit {
  productForm: FormGroup;
  type: Types;
  product: Products;
  header: string;
  statusproduct: StatusProducts;
  productAdd = true;
  stock: StockList;
  imgIsLoading: boolean;
  urlImage: any;
  urlDefaultUser = '../../../../assets/defaultPicture.png';
  category: Categorys;
  categoryList: Categorys;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getType();
    this.category = this.data.category;

    if (this.data.method === 'editProduct') {
      this.productForm.patchValue({
        ...this.data.product,
        image_url: this.data.product.image,
      });
      this.header = 'แก้ไขสินค้า';

      if (this.data.product.image) {
        this.urlImage = `${environment.apiUrl}` + this.data.product.image;
      }
    } else if (this.data.method === 'addProduct') {
      this.header = 'เพิ่มสินค้า';
      this.productAdd = !this.productAdd;
    }
  }

  initForm(): void {
    this.productForm = this.fb.group({
      product_name: ['', Validators.required],
      type_id: ['', Validators.required],
      product_price: ['', Validators.required],
      product_amount: [''],
      image: [null, Validators.required],
      image_url: [null],
    });
  }

  getType(): void {
    this.http.get(`${environment.apiUrl}types`).subscribe((res: Types) => {
      this.type = res;
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      const file = (event.target as HTMLInputElement).files[0];
      this.productForm.patchValue({
        image: file,
      });

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.urlImage = event.target.result;
      };

      reader.onloadstart = (event) => {
        this.imgIsLoading = true;
      };

      reader.onloadend = (event) => {
        this.imgIsLoading = false;
      };
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    const formData = new FormData();
    const body = this.productForm.getRawValue();

    if (this.data.method === 'editProduct') {
      formData.append('product[product_name]', body.product_name);
      formData.append('product[type_id]', body.type_id);
      formData.append('product[product_price]', body.product_price);

      if (body.image !== body.image_url) {
        formData.append('product[img]', body.image);
      }

      this.updateProduct(formData).subscribe((res) => {
        this.dialogRef.close();
        Swal.fire({
          icon: 'success',
          title: 'แก้ไขสินค้าสำเร็จ!',
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } else if (this.data.method === 'addProduct') {
      formData.append('product[product_name]', body.product_name);
      formData.append('product[type_id]', body.type_id);
      formData.append('product[product_price]', body.product_price);
      formData.append('product[img]', body.image);

      this.createProduct(formData).subscribe((res) => {
        this.dialogRef.close();
        Swal.fire({
          icon: 'success',
          title: 'เพิ่มสินค้าสำเร็จ!',
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  }

  createProduct(formData): Observable<Products> {
    return this.http.post<Products>(`${environment.apiUrl}products`, formData);
  }

  updateProduct(formData): Observable<Products> {
    return this.http.put<Products>(
      `${environment.apiUrl}products/` + this.data.product.id,
      formData
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}

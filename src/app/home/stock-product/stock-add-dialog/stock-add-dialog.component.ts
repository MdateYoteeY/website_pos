import { Products } from './../../../model/product';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { method } from 'src/app/model/model.model';
import { Stoctlistproduct } from 'src/app/model/stock';
import { Stock, Stocks } from 'src/app/model/stockproduct';
import { StockProductComponent } from '../page2.component';
import { PromotionList } from 'src/app/model/promotion';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-add-dialog',
  templateUrl: './stock-add-dialog.component.html',
  styleUrls: ['./stock-add-dialog.component.scss']
})
export class StockAddDialogComponent implements OnInit {

  stocklistForm: FormGroup;
  dataarray = [];
  stock: Stocks;
  header: string;
 stockAdd = true;
  stocklistproduct: Stoctlistproduct;
  addstock: Stock;


  product: Products;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StockProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {
     this.stocklistForm = this.fb.group({

      product_id: ['', Validators.required],
      price: ['', Validators.required],
      list_amount: ['', Validators.required],
    });
   }
   getProduct(){
    this.http.get(`${environment.apiUrl}products`).subscribe((res: Products)=>{
      this.product = res;
  console.log(this.product);
    });

   }

  ngOnInit(): void {
    this.getProduct();
      this.http.get(`${environment.apiUrl}stocks`).subscribe((res: Stock)=>{
      this.addstock = res;
  console.log(this.addstock);

})

   if (this.data.method === 'addStock') {
      this.header = 'สต็อคสินค้า';
      console.log(this.stock );
      this.dataarray.push(this.stocklistproduct)
    }
  }
  addForm(){
    this.dataarray.push(this.stocklistproduct)
  }
  removeForm(index){
    this.dataarray.splice(index);
  }
  onSubmit(): void {
    let body = {
      product_id:
        this.stocklistForm.getRawValue().product_id,
        list_amount: this.stocklistForm.getRawValue().list_amount,
        price: this.stocklistForm.getRawValue().price,
    };

    this.http
      .post(`${environment.apiUrl}stocks`, { table: body })
      .subscribe((res) => {
        this.dialogRef.close();
        Swal.fire({
          icon: 'success',
          title: 'เพิ่มสต็อคสำเร็จ!',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}


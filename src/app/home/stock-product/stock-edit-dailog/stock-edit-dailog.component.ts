import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { method } from 'src/app/model/model.model';
import { Products } from 'src/app/model/product';
import { StockList, stocklistproduct } from 'src/app/model/stock';
import { Stock, Stocks } from 'src/app/model/stockproduct';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { StockProductComponent } from '../page2.component';

@Component({
  selector: 'app-stock-edit-dailog',
  templateUrl: './stock-edit-dailog.component.html',
  styleUrls: ['./stock-edit-dailog.component.scss'],
})
export class StockEditDailogComponent implements OnInit {
  stockForm: FormGroup;
  dataarray = [];
  // stock: Stocks;
  header: string;
  stockAdd = true;
  stocklistproduct: stocklistproduct[] = [];

  items: FormArray;

  product: Products;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StockProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {}


  ngOnInit(): void {



  }




  close(): void {
    this.dialogRef.close();
  }
}



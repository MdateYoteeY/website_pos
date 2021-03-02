
import { Categorys } from './../../model/category';
import { method } from './../../model/model.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  productAdd = false;
  users = false;
  displayedColumns: string[] = [
    'productID',
    'name',
    'unitPrice',
    'amount',
    'action',
  ];
  dataSource = new MatTableDataSource<Categorys>(ELEMENT_DATA);
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {}

  ngOnInit(): void {
    if (this.data.method === 'product-add') {
      this.productAdd = true;
      this.getProductType();

    }
    if (this.data.method === 'users-add') {
      this.users = true;
    }
  }
  getProductType(): void {

    this.http
      .get<Categorys[]>(`${environment.apiUrl}categories`)
      .subscribe((res) => {
     this.dataSource.data = res;


      });
  }
}
const ELEMENT_DATA: PeriodicElement[] = [];
 interface PeriodicElement {
  id: number;
  category_name: string;
  created_at: string;
  updated_at: string;
}

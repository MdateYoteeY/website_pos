// import { Categorys } from './../../model/category';

import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { HttpClient } from '@angular/common/http';
import { Products } from 'src/app/model/product';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = [
    'productID',
    'name',
    'unitPrice',
    'amount',
    'action',
  ];


  dataSource = new MatTableDataSource<Products>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(public dialog: MatDialog,private http: HttpClient) {}
  search = new FormControl();

  ngOnInit(): void {
    this.getData();

    this.search.valueChanges.pipe(debounceTime(500)).subscribe((val) => {
      this.getData({ keywords: val });
    });


  }
  getData(params?: any): void {
    this.http
      .get<Products[]>(`${environment.apiUrl}products`, { params })
      .subscribe((res) => {
        this.dataSource.data = res ;
      });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { method: 'product-add' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}


const ELEMENT_DATA: PeriodicElement[] = [];


 interface PeriodicElement {
  id: number;
  status_product_id: number;
  type_id: number;
  product_name: string;
  product_price: number;
  product_amount: number;
  created_at: string;
  updated_at: string;
  category_id: number;
  image: string;
  status: string;
  type: string;
}

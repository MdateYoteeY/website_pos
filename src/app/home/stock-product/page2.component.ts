
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { StockDialogComponent } from './stock-dialog/stock-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Products } from 'src/app/model/product';
import { StockAddDialogComponent } from './stock-add-dialog/stock-add-dialog.component';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss'],
})
export class StockProductComponent implements OnInit {
  displayedColumns: string[] = ['id','amount', 'price', 'stock_date', 'action'];

   dataSource = new MatTableDataSource<Stocks>(ELEMENT_DATA);
  
   product: Products;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private http: HttpClient,  public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.getStock();
    this.getProduct();

  }
  getStock(params?: any): void {
    this.http.get(`${environment.apiUrl}stocks` , { params }).subscribe((res: Stocks[]) => {
      this.dataSource.data = res;


    });
  }
  getProduct(){
    this.http.get(`${environment.apiUrl}products`).subscribe((res: Products)=>{
      this.product = res;
    console.log(this.product);

});
   }


  openDialog(method: string, element?: Stocks): void {
    if (method === 'editStock') {
      const dialogRef = this.dialog.open(StockDialogComponent, {
        data: {
          method: method,
          stock: element,
        },
      });
    } else if (method === 'addStock') {
      const dialogRef = this.dialog.open(StockAddDialogComponent, {
        data: {
          method: method,
          product: this.product,
        },
      });
    }

    this.dialog.afterAllClosed.subscribe((res) => {
      this.getStock();
    });
  }

  editData(element: Stocks): void {
    this.openDialog('editStock', element);
  }




}


const ELEMENT_DATA: Stocks[] = [];


export interface Stocks {
  id: number;
  amount_all: number;
  price_all: number;
  stock_date: string;
  created_at: string;
  updated_at: string;
}


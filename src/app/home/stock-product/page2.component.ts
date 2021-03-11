import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { StockDialogComponent } from './stock-dialog/stock-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Products } from 'src/app/model/product';
import { StockAddDialogComponent } from './stock-add-dialog/stock-add-dialog.component';
import Swal from 'sweetalert2';
import { StockEditDailogComponent } from './stock-edit-dailog/stock-edit-dailog.component';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss'],
})
export class StockProductComponent implements OnInit {
  displayedColumns: string[] = [
    'head',
    'id',
    'amount',
    'price',
    'stock_date',
    'action',
  ];

  dataSource = new MatTableDataSource<Stocks>(ELEMENT_DATA);

  product: Products;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getStock();
    this.getProduct();
  }
  getStock(params?: any): void {
    this.http
      .get(`${environment.apiUrl}stocks`, { params })
      .subscribe((res: Stocks[]) => {
        this.dataSource.data = res;
      });
  }
  getProduct() {
    this.http
      .get(`${environment.apiUrl}products`)
      .subscribe((res: Products) => {
        this.product = res;
        console.log(this.product);
      });
  }

  openDialog(method: string, element?: Stocks): void {
    if (method === 'showStock') {
      const dialogRef = this.dialog.open(StockDialogComponent, {
        data: {
          method: method,
          stock: element,
          product: this.product,
        },
      });
    } else if (method === 'addStock') {
      const dialogRef = this.dialog.open(StockAddDialogComponent, {
        data: {
          method: method,
          stock: element,
          product: this.product,
        },
      });
    }

    this.dialog.afterAllClosed.subscribe((res) => {
      this.getStock();
    });
  }

  showstock(element: Stocks): void {
    this.openDialog('showStock', element);
  }
  addstock(element: Stocks): void {
    this.openDialog('addStock', element);
  }

  deleteData(element: Stocks): void {
    Swal.fire({
      title: 'คุณแน่ใจใช่ไหม?',
      // text: 'คุณต้องการลบโต๊ะ "' + element.id + '" ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 235, 156)',
      cancelButtonColor: 'rgb(255, 98, 98)',
      confirmButtonText: 'ยืนยัน',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(`${environment.apiUrl}stocks/` + element.id)
          .subscribe((res) => {
            Swal.fire({
              icon: 'success',
              title: 'ลบเรียบร้อยแล้ว!',
              showConfirmButton: false,
              timer: 1500,
            });
            this.getStock();
          });
      }
    });
  }
}

const ELEMENT_DATA: Stocks[] = [];

interface Stocks {
  id: number;
  amount_all: number;
  price_all: number;
  stock_date: string;
  created_at: string;
  updated_at: string;
  items: any;
}

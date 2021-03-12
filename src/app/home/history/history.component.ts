import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';
import { Orders } from 'src/app/model/order';
import { Products } from 'src/app/model/product';
import { StatusProducts } from 'src/app/model/status';
import { Types } from 'src/app/model/type';
import { environment } from 'src/environments/environment';
import { ProductsDialogComponent } from '../products/products-dialog/products-dialog.component';
import { HistoryDialogComponent } from './history-dialog/history-dialog.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'list',
    'number',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<Orders>(ELEMENT_DATA);
  order: Orders;

  constructor(private http: HttpClient, public dialog: MatDialog) {}
  search = new FormControl();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getOrder();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // getType(): void {
  //   this.http.get(`${environment.apiUrl}types`).subscribe((res: Types) => {
  //     this.type = res;
  //   });
  // }

  getOrder(params?: any): void {
    this.http
      .get(`${environment.apiUrl}orders`, { params })
      .subscribe((res: Orders[]) => {
        this.dataSource.data = res;
        console.log(res);
      });
  }

  openDialog(method: string, element?: Orders): void {
    if (method === 'showOrder') {
      const dialogRef = this.dialog.open(HistoryDialogComponent, {
        data: {
          method: method,
          order: element,
        },
      });
    }

    this.dialog.afterAllClosed.subscribe((res) => {
      this.getOrder();
    });
  }

  editData(element: Orders): void {
    this.openDialog('showOrder', element);
  }
  deleteData(element: Orders): void {
    console.log(element.id);
    console.log(environment.apiUrl);

    this.http
      .delete(`${environment.apiUrl}orders/` + element.id)
      .subscribe((res) => {
        console.log('order ' + element.id + ' has delete!');
        console.log(res);

        this.getOrder();
      });
  }
}

const ELEMENT_DATA: Orders[] = [];

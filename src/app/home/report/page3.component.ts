import { state } from '@angular/animations';
import { Receipts} from '../../model/receipt';
import { Orders } from './../../model/order';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { method } from 'src/app/model/model.model';
import { Peoples } from 'src/app/model/people';
import { Products } from 'src/app/model/product';
import { environment } from 'src/environments/environment';
import { HistoryComponent } from '../history/history.component';
import { MatPaginator } from '@angular/material/paginator';
import { HistoryDialogComponent } from '../history/history-dialog/history-dialog.component';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss'],
})
export class ReportComponent implements OnInit {
  displayedColumns: string[] = ['list', 'name', 'number', 'status', 'action'];
  header: string;
  priceAll: number;
  sum: number;
  i: number;
  j: number;
  cancel: number;
  dataSource = new MatTableDataSource<Peoples>(ELEMENT_DATA);
  dataSr = new MatTableDataSource<Orders>(ELEMENT_DT);
  dataReceipt = new MatTableDataSource<Receipts>(ELEMENT_RECEIPT);
  receipt: Receipts;
  order: Orders;
  people: Peoples;

  constructor(private http: HttpClient, public dialog: MatDialog) {}
  search = new FormControl();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.initForm();
    this.getPeople();
    this.getOrder();
    this.getReceipt();
  }
  getPeople(): void {
    this.http.get(`${environment.apiUrl}people`).subscribe((res: Peoples[]) => {
      this.dataSource.data = res;
      console.log(res);
      const totalPeople = res.reduce(
        (state, value) => {
          state.amount += value.amount;
          return state;
        },
        { amount: 0 }
      );
      this.sum = totalPeople.amount;

      console.log(this.sum);
    });
  }
  getReceipt(): void {
    this.http
      .get(`${environment.apiUrl}receipts`)
      .subscribe((res: Receipts[]) => {
        this.dataReceipt.data = res;
        console.log(res);
        const totalPeople = res.reduce(
          (state, value) => {
            state.price_all += value.price_all;
            return state;
          },
          { price_all: 0 }
        );
        this.priceAll = totalPeople.price_all;

        console.log(this.priceAll);
      });
  }

  getOrder(): void {
    this.http.get(`${environment.apiUrl}orders`).subscribe((res: Orders[]) => {
      this.dataSr.data = res;

      var empire = res.filter(function (order) {
        return order.status === 'No Success';
      });
      var i = 0;
      var jediScores = empire.map(function () {
        return (i += 1);
      });
      this.i = i;

      var empire = res.filter(function (order) {
        return order.status === 'Success';
      });
      var j = 0;
      var jediScores = empire.map(function () {
        return (j += 1);
      });
      this.j = j;

      var empire = res.filter(function (order) {
        return order.status === 'Cancel';
      });
      var cancel = 0;
      var jediScores = empire.map(function () {
        return (cancel += 1);
      });
      this.cancel = cancel;
    });
  }

  initForm(): void {}

  onSubmit(): void {}

  openDialog(method: string, element?: Orders): void {
    if (method === 'showOrder') {
      const dialogRef = this.dialog.open(ReportDialogComponent, {
        data: {
          method: method,
          order: element,
        },
      });

      dialogRef.afterClosed().subscribe((res) => {
        this.getOrder();
      });
    }
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



const ELEMENT_DATA: Peoples[] = [];
const ELEMENT_DT: Orders[] = [];

const ELEMENT_RECEIPT: Receipts[] = [];


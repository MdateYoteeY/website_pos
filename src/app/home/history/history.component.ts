
import { Tables } from 'src/app/model/table.model';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as Chart from 'chart.js';
import { Orders } from 'src/app/model/order';
import { Peoples } from 'src/app/model/people';
import { Receipts } from 'src/app/model/receipt';
import { environment } from 'src/environments/environment';
import { HistoryDialogComponent } from './history-dialog/history-dialog.component';
import { SumaryDialogComponent } from './sumary-dialog/sumary-dialog.component';
import { Reports } from 'src/app/model/report';



@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['list', 'name', 'number', 'status'];
  header: string;
  priceAll: number;
  sum: number;
  i: number;
  j: number;
  cancel: number;
  reserve: number;
  ready: number;
  busy: number;
  dataSource = new MatTableDataSource<Peoples>(ELEMENT_DATA);
  dataSr = new MatTableDataSource<Orders>(ELEMENT_DT);
  dataReceipt = new MatTableDataSource<Receipts>(ELEMENT_RECEIPT);
  dataTable = new MatTableDataSource<Tables>(ELEMENT_TABLE);
  dataReport = new MatTableDataSource<Reports>(ELEMENT_REPORT);
  receipt: Receipts;
  order: Orders;
  people: Peoples;
  table: Tables;
  report: Reports;
  dateStart = new FormControl();
  constructor(private http: HttpClient, public dialog: MatDialog) {}


  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.initForm();
    this.productBar();
    this.getPeople();
    this.getOrder();
    this.getReceipt();
    this.getTable();

  }
  getReport(params?: any): void {
    this.http
      .get(`${environment.apiUrl}report`, { params })
      .subscribe((res: Reports[]) => {
        this.dataReport.data = res;
        console.log(res);
        const maps = res['product'];
        const name = maps.map((maps) => maps['name']);
        const amount = maps.map((maps) => maps['amount']);
        // console.log(reformattedArray);
        // ['f', 'd', 'v', 's', 'g', 'e']
        const yearBar = new Chart('yearBar', {
          type: 'bar',
          data: {
            labels: name,
            datasets: [
              {
                data: amount,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 206, 86, 0.5)',
                  'rgba(153, 102, 255, 0.5)',
                  'rgba(255, 159, 64, 0.5)',
                  'rgba(255, 99, 132,0.5)',
                  'rgba(54, 162, 235,0.5)',
                  'rgba(255, 206, 86,0.5)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255,0.5)',
                  'rgba(255, 159, 64)',
                ],
                fill: true,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'to Day',
            },
            hover: {
              mode: 'nearest',
              intersect: true,
            },
          },
        });
      });
  }
  productBar(): void {
    this.dateStart.valueChanges.pipe().subscribe((val) => {
      this.getReport({ start_date: val, end_date: val });

    });
  }

  getPeople(): void {
    this.http.get(`${environment.apiUrl}people`).subscribe((res: Peoples[]) => {
      this.dataSource.data = res;
      // console.log(res);
      const totalPeople = res.reduce(
        (state, value) => {
          state.amount += value.amount;
          return state;
        },
        { amount: 0 }
      );
      this.sum = totalPeople.amount;

      // console.log(this.sum);
    });
  }
  getReceipt(): void {
    this.http
      .get(`${environment.apiUrl}receipts`)
      .subscribe((res: Receipts[]) => {
        this.dataReceipt.data = res;
        // console.log(res);
        const totalPeople = res.reduce(
          (state, value) => {
            state.price_all += value.price_all;
            return state;
          },
          { price_all: 0 }
        );
        this.priceAll = totalPeople.price_all;

        // console.log(this.priceAll);
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
      console.log(empire);

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
  getTable(): void {
    this.http.get(`${environment.apiUrl}tables`).subscribe((res: Tables[]) => {
      this.dataTable.data = res;

      var empire = res.filter(function (table) {
        return table.status === 'Ready';
      });
      var ready = 0;
      var jediScores = empire.map(function () {
        return (ready += 1);
      });
      this.ready = ready;

      var empire = res.filter(function (table) {
        return table.status === 'Busy';
      });
      var busy = 0;
      var jediScores = empire.map(function () {
        return (busy += 1);
      });
      this.busy = busy;

      var empire = res.filter(function (table) {
        return table.status === 'Reserve';
      });
      var reserve = 0;
      var jediScores = empire.map(function () {
        return (reserve += 1);
      });
      this.reserve = reserve;
    });
  }

  initForm(): void {}

  onSubmit(): void {}

  openDialog(method: string, element?: Orders): void {
    if (method === 'showOrder') {
      const dialogRef = this.dialog.open(HistoryDialogComponent, {
        data: {
          method: method,
          order: element,
        },
      });

      dialogRef.afterClosed().subscribe((res) => {
        this.getOrder();
      });
    }
    if (method === 'showSummary') {
      const dialogRef = this.dialog.open(SumaryDialogComponent, {
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
  showSummary(element: Orders): void {
    this.openDialog('showSummary', element);
  }
}

const ELEMENT_DATA: Peoples[] = [];
const ELEMENT_DT: Orders[] = [];

const ELEMENT_RECEIPT: Receipts[] = [];
const ELEMENT_TABLE: Tables[] = [];
const ELEMENT_REPORT: Reports[] = [];

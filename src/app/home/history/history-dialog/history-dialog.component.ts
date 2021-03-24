import { method } from 'src/app/model/model.model';
import { Products } from './../../../model/product';
import { Component, Inject, OnInit } from '@angular/core';
import { HistoryComponent } from '../history.component';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { Orders } from 'src/app/model/order';

@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.scss'],
})
export class HistoryDialogComponent implements OnInit {
  items: FormArray;
  displayedColumns: string[] = [
    'id',
    'name',
    'type',
    'price',
    'amount',
    'status',
    'action',
  ];

  header: string;
  order: Orders;
  product: Products[];
  dataSource = new MatTableDataSource<Orders>(ELEMENT_DATA);

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<HistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {}

  ngOnInit(): void {
    if (this.data.method === 'showOrder') {
      this.header = this.data.order.store.name;
      this.order = this.data.order;
    }
  }

  getProduct() {
    this.http
      .get(`${environment.apiUrl}products`)
      .subscribe((res: Products[]) => {
        this.product = res;
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}

const ELEMENT_DATA: Orders[] = [];

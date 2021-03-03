import { StatusTables } from './../../../model/table.model';
import { HttpClient } from '@angular/common/http';
import { Tables } from 'src/app/model/table.model';
import { Zones } from './../../../model/zone.model';
import { TableComponent } from './../table.component';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  PatternValidator,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { method } from 'src/app/model/model.model';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.scss'],
})
export class TableDialogComponent implements OnInit {
  tableForm: FormGroup;
  zone: Zones;
  table: Tables;
  header: string;
  status_table: StatusTables;
  tableAdd = true;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {}

  ngOnInit(): void {
    this.tableForm = this.fb.group({
      table_number: ['', Validators.required],
      zone_id: ['', Validators.required],
      seat_amount: ['', Validators.min(0)],
      status_table_id: ['', Validators.required],
    });

    this.zone = this.data.zone;
    this.status_table = this.data.tableStatus;

    if (this.data.method === 'editTable') {
      this.tableForm.patchValue(this.data.table);
      this.header = 'แก้ไขโต๊ะที่นั่ง';
    } else if (this.data.method === 'addTable') {
      this.header = 'เพิ่มโต๊ะที่นั่ง';
      this.tableAdd = !this.tableAdd;
    }
  }

  onSubmit(): void {
    if (this.data.method === 'editTable') {
      if (this.tableForm.invalid) {
        return;
      }
      let body = {
        table_number: this.tableForm.getRawValue().table_number,
        zone_id: this.tableForm.getRawValue().zone_id,
        seat_amount: this.tableForm.getRawValue().seat_amount,
        status_table_id: this.tableForm.getRawValue().status_table_id,
      };

      this.http
        .put(`${environment.apiUrl}tables/` + this.data.table.id, {
          table: body,
        })
        .subscribe((res) => {
          Swal.fire({
            icon: 'success',
            title: 'แก้ไขโต๊ะสำเร็จ!',
            showConfirmButton: false,
            timer: 1500,
          });
          console.log('Table updated!');
          this.dialogRef.close();
        });
    } else if (this.data.method === 'addTable') {
      if (
        this.tableForm.controls['table_number'].invalid &&
        this.tableForm.controls['zone_id'].invalid
      ) {
        return;
      }
      let body = {
        table_number: this.tableForm.getRawValue().table_number,
        zone_id: this.tableForm.getRawValue().zone_id,
        seat_amount: this.tableForm.getRawValue().seat_amount,
      };

      console.log('add table');
      this.http
        .post(`${environment.apiUrl}tables`, { table: body })
        .subscribe((res) => {
          this.dialogRef.close();
          Swal.fire({
            icon: 'success',
            title: 'เพิ่มโต๊ะสำเร็จ!',
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

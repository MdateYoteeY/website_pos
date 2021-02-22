import { HttpClient } from '@angular/common/http';
import { Tables } from 'src/app/model/table.model';
import { Zones } from './../../../model/zone.model';
import { TableComponent } from './../table.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { method } from 'src/app/model/model.model';
import { environment } from 'src/environments/environment';

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

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {
    this.tableForm = this.fb.group({
      table_number: ['', Validators.required],
      zone_id: ['', Validators.required],
      seat_amount: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.zone = this.data.zone;

    if (this.data.method === 'editTable') {
      this.tableForm.patchValue(this.data.table);
      this.header = 'แก้ไขโต๊ะที่นั่ง';
    } else if (this.data.method === 'addTable') {
      this.header = 'เพิ่มโต๊ะที่นั่ง';
    }
  }

  onSubmit(): void {
    if (this.data.method === 'editTable') {
    } else if (this.data.method === 'addTable') {
      let body = {
        table_number: this.tableForm.getRawValue().table_number,
        zone_id: this.tableForm.getRawValue().zone_id,
        seat_amount: this.tableForm.getRawValue().seat_amount,
      };
      this.http
        .post(`${environment.apiUrl}tables`, { table: body })
        .subscribe((res) => {
          console.log('Table Added!');
          this.dialogRef.close();
        });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

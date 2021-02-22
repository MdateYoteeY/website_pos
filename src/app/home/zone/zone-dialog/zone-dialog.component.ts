import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ZoneComponent } from './../zone.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { method } from 'src/app/model/model.model';

@Component({
  selector: 'app-zone-dialog',
  templateUrl: './zone-dialog.component.html',
  styleUrls: ['./zone-dialog.component.scss'],
})
export class ZoneDialogComponent implements OnInit {
  zoneAddForm: FormGroup;
  header = 'เพิ่มโซนที่นั่ง';

  constructor(
    public dialogRef: MatDialogRef<ZoneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.zoneAddForm = this.fb.group({
      name_zone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.method === 'editZone') {
      this.header = 'แก้ไขโซนที่นั่ง';
      this.zoneAddForm.patchValue(this.data.zone);
    }
  }

  onSubmit(): void {
    let body = {
      name_zone: this.zoneAddForm.getRawValue().name_zone,
    };

    if (this.data.method === 'addZone') {
      this.http
        .post(`${environment.apiUrl}zones`, { zone: body })
        .subscribe((res) => {
          console.log('Zone has Added!');
        });
      this.dialogRef.close();
    } else if (this.data.method === 'editZone') {
      this.http
        .put(`${environment.apiUrl}zones/` + this.data.zone.id, { zone: body })
        .subscribe((res) => {
          console.log('Zone has edited!');
        });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

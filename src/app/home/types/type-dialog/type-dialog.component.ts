import { Types } from './../../../model/type';
import { Categorys } from './../../../model/category';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { method } from 'src/app/model/model.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { TypesComponent } from '../types.component';

@Component({
  selector: 'app-type-dialog',
  templateUrl: './type-dialog.component.html',
  styleUrls: ['./type-dialog.component.scss'],
})
export class TypeDialogComponent implements OnInit {
  typeForm: FormGroup;
  category: Categorys;
  type: Types;
  header: string;
  typeAdd = true;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TypesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {}

  ngOnInit(): void {
    this.typeForm = this.fb.group({
      type_name: ['', Validators.required],
      category_id: ['', Validators.required],
    });

    this.category = this.data.category;

    if (this.data.method === 'editType') {
      this.typeForm.patchValue(this.data.type);
      this.header = 'แก้ไขชื่อประเภทสินค้า';
    } else if (this.data.method === 'addType') {
      this.header = 'เพิ่มประเภทสินค้า';
      this.typeAdd = !this.typeAdd;
    }
  }

  onSubmit(): void {
    if (this.data.method === 'editType') {
      if (this.typeForm.invalid) {
        return;
      }
      let body = {
        type_name: this.typeForm.getRawValue().type_name,
        category_id: this.typeForm.getRawValue().category_id,
      };

      this.http
        .put(`${environment.apiUrl}types/` + this.data.type.id, {
          type: body,
        })
        .subscribe((res) => {
          Swal.fire({
            icon: 'success',
            title: 'แก้ไขประเภทสำเร็จ!',
            showConfirmButton: false,
            timer: 1500,
          });
          console.log('Type updated!');
          this.dialogRef.close();
        });
    } else if (this.data.method === 'addType') {
      if (
        this.typeForm.controls['type_name'].invalid &&
        this.typeForm.controls['category_id'].invalid
      ) {
        return;
      }
      let body = {
        type_name: this.typeForm.getRawValue().type_name,
        category_id: this.typeForm.getRawValue().category_id,
      };

      console.log('add type');
      this.http
        .post(`${environment.apiUrl}types`, { type: body })
        .subscribe((res) => {
          this.dialogRef.close();
          Swal.fire({
            icon: 'success',
            title: 'เพิ่มประเภทสินค้าสำเร็จ!',
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

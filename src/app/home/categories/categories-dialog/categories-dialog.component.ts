import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { method } from 'src/app/model/model.model';
import { environment } from 'src/environments/environment';
import { CategoriesComponent } from '../categories.component';

@Component({
  selector: 'app-categories-dialog',
  templateUrl: './categories-dialog.component.html',
  styleUrls: ['./categories-dialog.component.scss']
})
export class CategoriesDialogComponent implements OnInit {
  categoryAddForm: FormGroup;
  header = 'เพิ่มโซนที่นั่ง';

  constructor(
    public dialogRef: MatDialogRef<CategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.categoryAddForm = this.fb.group({
      category_name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.method === 'editCategory') {
      this.header = 'แก้ไขหมวดหมู่';
      this.categoryAddForm.patchValue(this.data.category);
    }
  }

  onSubmit(): void {
    let body = {
      category_name: this.categoryAddForm.getRawValue().category_name,
    };

    if (this.data.method === 'addCategory') {
      this.http
        .post(`${environment.apiUrl}categories`, { category: body })
        .subscribe((res) => {
          console.log('Category has Added!');
        });
      this.dialogRef.close();
    } else if (this.data.method === 'editCategory') {
      this.http
        .put(`${environment.apiUrl}categories/` + this.data.category.id, { category: body })
        .subscribe((res) => {
          console.log('category has edited!');
        });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}


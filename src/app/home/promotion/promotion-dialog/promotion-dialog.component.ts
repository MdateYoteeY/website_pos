import { method } from './../../../model/model.model';

import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-promotion-dialog',
  templateUrl: './promotion-dialog.component.html',
  styleUrls: ['./promotion-dialog.component.scss'],
})
export class PromotionDialogComponent implements OnInit {
  promotionAddForm: FormGroup;
  header = 'เพิ่มโปรโมชัน';
  constructor(
    private formBuilder: FormBuilder,

    private http: HttpClient,
    public dialogRef: MatDialogRef<PromotionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.promotionAddForm = this.formBuilder.group({
      promotion_name: ['', Validators.required],
      discount: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      img: [null],
    });
  }

  onSubmit(): void {
    if (this.promotionAddForm.invalid) {
      return;
    }
    if (this.data.method === 'addPromotion') {
      let body = {
        promotion_name: this.promotionAddForm.getRawValue().promotion_name,
        promotion_discount: this.promotionAddForm.getRawValue().discount,
        date_start: this.promotionAddForm.getRawValue().start_date,
        date_end: this.promotionAddForm.getRawValue().end_date,
        img: null,
      };

      this.http
        .post(`${environment.apiUrl}promotions`, { promotion: body })
        .subscribe((res) => {
          Swal.fire({
            icon: 'success',
            title: 'เพิ่มโปรโมชั่นสำเร็จ!',
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

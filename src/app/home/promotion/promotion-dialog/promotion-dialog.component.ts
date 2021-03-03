import { method } from './../../../model/model.model';

import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
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
    @Inject(MAT_DIALOG_DATA) public data
  ) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.promotionAddForm = this.formBuilder.group(
      {
        promotion_name: ['', Validators.required],
        discount: ['', Validators.required],
        start_date: ['', Validators.required],
        end_date: ['', [Validators.required]],

      },

    );
  }
  onSubmit(): void {}

  close(): void {
    this.dialogRef.close();
  }
}

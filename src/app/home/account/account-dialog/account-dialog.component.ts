import { environment } from './../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { method } from 'src/app/model/model.model';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.scss'],
})
export class AccountDialogComponent implements OnInit {
  accountAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {}

  ngOnInit(): void {
    this.accountAddForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      status: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
    });
    this.accountAddForm.patchValue(this.data);
    console.log(this.data);
  }

  onSubmit(): void {
    let body = {
      firstname: this.accountAddForm.getRawValue().firstname,
      lastname: this.accountAddForm.getRawValue().lastname,
      phone_number: this.accountAddForm.getRawValue().phoneNumber,
      staff_id: this.accountAddForm.getRawValue().status,
      username: this.accountAddForm.getRawValue().username,
      password: this.accountAddForm.getRawValue().password,
      password_confirmation: this.accountAddForm.getRawValue()
        .passwordConfirmation,
    };

    this.http
      .post(`${environment.apiUrl}users`, { user: body })
      .subscribe((res) => {
        console.log('Add Account success!!');
      });
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}

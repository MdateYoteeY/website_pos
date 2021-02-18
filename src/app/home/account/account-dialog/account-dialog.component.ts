import { Staff, Users, method } from './../../../model/model.model';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.scss'],
})
export class AccountDialogComponent implements OnInit {
  accountAddForm: FormGroup;
  selected: FormControl;
  dataDialog: method;
  user: Users;
  check = true;
  passwordView = true;
  c: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {
    this.accountAddForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone_number: ['', Validators.required],
      staff_id: new FormControl(null),
      username: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.dataDialog = this.data;

    if (this.data.method === 'editAccount') {
      this.accountAddForm.patchValue(this.data.user);
      this.accountAddForm.controls.staff_id.setValue(
        `${this.data.user.status}`,
        { onlySelf: true }
      );

      console.log(this.accountAddForm.controls['staff_id'].value);

      this.check = false;
      this.passwordView = false;
    }
  }

  editPass(): void {
    this.passwordView = !this.passwordView;
  }

  onSubmit(): void {
    if (this.data.method !== 'editAccount') {
      let body = {
        firstname: this.accountAddForm.getRawValue().firstname,
        lastname: this.accountAddForm.getRawValue().lastname,
        phone_number: this.accountAddForm.getRawValue().phone_number,
        staff_id: this.accountAddForm.getRawValue().staff_id,
        username: this.accountAddForm.getRawValue().username,
        password: this.accountAddForm.getRawValue().password,
        password_confirmation: this.accountAddForm.getRawValue()
          .password_confirmation,
      };

      this.http
        .post(`${environment.apiUrl}users`, { user: body })
        .subscribe((res) => {
          console.log('Add Account success!!');
        });
      this.dialogRef.close();
    } else if (this.data.method === 'editAccount') {
      let body = {
        firstname: this.accountAddForm.getRawValue().firstname,
        lastname: this.accountAddForm.getRawValue().lastname,
        phone_number: this.accountAddForm.getRawValue().phone_number,
        staff_id: this.accountAddForm.getRawValue().staff_id,
        username: this.accountAddForm.getRawValue().username,
      };
      if (
        this.accountAddForm.get('password').value &&
        this.accountAddForm.get('password_confirmation').value !== null
      ) {
      }
      this.http
        .put(`${environment.apiUrl}users/` + this.data.user.id, {
          user: body,
        })
        .subscribe((res) => {
          console.log('Update Account success!!');
        });
      this.dialogRef.close();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

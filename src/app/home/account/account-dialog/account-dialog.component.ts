import { ErrorResponse, Users, method } from './../../../model/model.model';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyErrorStateMatcher } from 'src/app/login/login.component';
import { MustMatch } from 'src/assets/matchCheck';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.scss'],
})
export class AccountDialogComponent implements OnInit {
  accountAddForm: FormGroup;

  errorRes: ErrorResponse;

  matcher = new MyErrorStateMatcher();
  dataDialog: method;
  user: Users;
  check = true;
  passwordView = true;
  header = 'เพิ่มบัญชีผู้ใช้งาน';
  forbiddenUsernames = ['admin'];

  userAlready = true;

  fileToUpload: File = null;
  img: any;

  constructor(
    private formBuilder: FormBuilder,

    private http: HttpClient,
    public dialogRef: MatDialogRef<AccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: method
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.dataDialog = this.data;

    if (this.data.method === 'editAccount') {
      this.accountAddForm.patchValue(this.data.user);
      this.check = false;
      this.passwordView = false;
      this.header = 'แก้ไขบัญชีผู้ใช้งาน';
    }
  }

  createForm(): void {
    this.accountAddForm = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        phone_number: [
          '',
          [
            Validators.compose([
              Validators.required,
              Validators.minLength(9),
              Validators.maxLength(10),
              Validators.pattern('[0][0-9]{9}'),
            ]),
          ],
        ],
        staff_id: ['', Validators.required],
        username: ['', [Validators.required]],
        password: [null, [Validators.minLength(8)]],
        password_confirmation: [null],
        img: [''],
      },
      {
        validators: [MustMatch('password', 'password_confirmation')],
      }
    );
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.accountAddForm.get('img').setValue(file);
    }
  }

  editPass(): void {
    this.passwordView = !this.passwordView;
  }

  onSubmit(): void {
    const formData = new FormData();

    if (this.data.method !== 'editAccount') {
      if (this.accountAddForm.invalid) {
        return;
      }

      // formData.append('firstname', this.accountAddForm.get('firstname').value);
      // formData.append('lastname', this.accountAddForm.get('lastname').value);
      // formData.append(
      //   'phone_number',
      //   this.accountAddForm.get('phone_number').value
      // );
      // formData.append('staff_id', this.accountAddForm.get('staff_id').value);
      // formData.append('username', this.accountAddForm.get('username').value);
      // formData.append('password', this.accountAddForm.get('password').value);
      // formData.append(
      //   'password_confirmation',
      //   this.accountAddForm.get('password_confirmation').value
      // );
      formData.append('img', this.accountAddForm.get('img').value);

      let body = {
        firstname: this.accountAddForm.getRawValue().firstname,
        lastname: this.accountAddForm.getRawValue().lastname,
        phone_number: this.accountAddForm.getRawValue().phone_number,
        staff_id: this.accountAddForm.getRawValue().staff_id,
        username: this.accountAddForm.getRawValue().username,
        password: this.accountAddForm.getRawValue().password,
        password_confirmation: this.accountAddForm.getRawValue()
          .password_confirmation,
        img: formData.get('img'),
      };

      // let body = {};
      // formData.forEach(function (value, key) {
      //   body[key] = value;
      // });
      // let bodys = JSON.stringify(body);
      console.log(body);

      this.http.post(`${environment.apiUrl}users`, { user: body }).subscribe(
        (res) => {
          Swal.fire({
            icon: 'success',
            title: 'เพิ่มบัญชีสำเร็จ!',
            text:
              'บัญชี "' +
              this.accountAddForm.getRawValue().username +
              '" ถูกเพิ่มเรียบร้อยแล้ว',
            showConfirmButton: false,
            timer: 1500,
          });
          this.dialogRef.close();
        },
        (error) => {
          this.accountAddForm.controls['username'].setErrors({
            userAlready: true,
          });
        }
      );
    } else if (this.data.method === 'editAccount') {
      if (this.accountAddForm.invalid) {
        return;
      }
      let body = {};
      if (this.accountAddForm.getRawValue().password !== null) {
        body = {
          firstname: this.accountAddForm.getRawValue().firstname,
          lastname: this.accountAddForm.getRawValue().lastname,
          phone_number: this.accountAddForm.getRawValue().phone_number,
          staff_id: this.accountAddForm.getRawValue().staff_id,
          username: this.accountAddForm.getRawValue().username,
          password: this.accountAddForm.getRawValue().password,
          img: formData.get('img').toString(),
        };
      } else {
        body = {
          firstname: this.accountAddForm.getRawValue().firstname,
          lastname: this.accountAddForm.getRawValue().lastname,
          phone_number: this.accountAddForm.getRawValue().phone_number,
          staff_id: this.accountAddForm.getRawValue().staff_id,
          username: this.accountAddForm.getRawValue().username,
          img: formData.get('img').toString(),
        };
      }

      this.http
        .put(`${environment.apiUrl}users/` + this.data.user.id, {
          user: body,
        })
        .subscribe(
          (res) => {
            this.dialogRef.close();
            Swal.fire({
              icon: 'success',
              title: 'แก้ไขบัญชีสำเร็จ!',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          (error) => {
            this.accountAddForm.controls['username'].setErrors({
              userAlready: true,
            });
          }
        );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

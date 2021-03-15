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
  profile: string;
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
  urlImage: any;

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
    this.profile = event.target.value;
    const file = (event.target as HTMLInputElement).files[0];
    this.accountAddForm.patchValue({
      img: file,
    });
    console.log(this.profile);
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      const file = (event.target as HTMLInputElement).files[0];
      this.accountAddForm.patchValue({
        img: file,
      });
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.urlImage = event.target.result;
      };
    }
  }

  editPass(): void {
    this.passwordView = !this.passwordView;
  }

  onSubmit(): void {
    if (this.data.method !== 'editAccount') {
      if (this.accountAddForm.invalid) {
        return;
      }

      let body = this.accountAddForm.getRawValue();
      var formData: any = new FormData();
      formData.append('user[firstname]', body.firstname);
      formData.append('user[lastname]', body.lastname);
      formData.append('user[phone_number]', body.phone_number);
      formData.append('user[staff_id]', body.staff_id);
      formData.append('user[username]', body.username);
      formData.append('user[password]', body.password);
      formData.append(
        'user[password_confirmation]',
        body.password_confirmation
      );
      formData.append('user[img]', body.img);

      this.http.post(`${environment.apiUrl}users`, formData).subscribe(
        (res) => {
          close();
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
        };
      } else {
        body = {
          firstname: this.accountAddForm.getRawValue().firstname,
          lastname: this.accountAddForm.getRawValue().lastname,
          phone_number: this.accountAddForm.getRawValue().phone_number,
          staff_id: this.accountAddForm.getRawValue().staff_id,
          username: this.accountAddForm.getRawValue().username,
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

import { AccountDialogComponent } from './account-dialog/account-dialog.component';
import { Users, Staff } from './../../model/model.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'First name',
    'Last name',
    'Phone NO.',
    'Username',
    'staff',
    'action',
  ];

  dataSource = new MatTableDataSource<Users>(ELEMENT_DATA);
  staff: Array<Staff>;

  constructor(private http: HttpClient, public dialog: MatDialog) {}
  search = new FormControl();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getUser();
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((val) => {
      this.getUser({ keywords: val });
    });
  }

  getUser(params?: any): void {
    this.http
      .get(`${environment.apiUrl}users`, { params })
      .subscribe((res: Users[]) => {
        this.dataSource.data = res;
        console.log(res);
      });
  }

  async openDialog(method?: string, userEdit?: Users) {
    if (!this.staff) {
      await this.http
        .get<Staff[]>(`${environment.apiUrl}staffs`)
        .toPromise()
        .then((res) => {
          this.staff = res;
        });
    }

    let dialogRef;

    if (method === 'editAccount') {
      dialogRef = this.dialog.open(AccountDialogComponent, {
        data: { method: method, user: userEdit, staff: this.staff },
      });
    } else {
      dialogRef = this.dialog.open(AccountDialogComponent, {
        data: { staff: this.staff },
      });
    }

    dialogRef.afterClosed().subscribe((res) => {
      this.getUser();
    });
  }

  editData(data: Users): void {
    this.openDialog('editAccount', data);
  }

  deleteData(data: Users): void {
    Swal.fire({
      title: 'คุณแน่ใจใช่ไหม?',
      text: 'คุณต้องการลบบัญชี "' + data.username + '" ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 235, 156)',
      cancelButtonColor: 'rgb(255, 98, 98)',
      confirmButtonText: 'ยืนยัน',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`${environment.apiUrl}users/` + data.id).subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: 'ลบเรียบร้อยแล้ว!',
              showConfirmButton: false,
              timer: 1500,
            });
            this.getUser();
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              text: 'เกิดข้อผิดพลาดบางอย่างในการลบบัญชี',
              title: 'เกิดข้อผิดพลาด!',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }
}

const ELEMENT_DATA: Users[] = [];

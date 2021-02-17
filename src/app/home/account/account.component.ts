import { AccountDialogComponent } from './account-dialog/account-dialog.component';
import { Users, Staff } from './../../model/model.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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

  user: Array<Users>;
  staff: Array<Staff>;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.http.get(`${environment.apiUrl}users`).subscribe((res: Users[]) => {
      this.user = res;
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

    if (method === 'editAccount') {
      const dialogRef = this.dialog.open(AccountDialogComponent, {
        data: { method: method, user: userEdit, staff: this.staff },
      });

      this.dialog.afterAllClosed.subscribe((res) => {
        this.getUser();
      });
    } else {
      const dialogRef = this.dialog.open(AccountDialogComponent, {
        data: { staff: this.staff },
      });

      this.dialog.afterAllClosed.subscribe((res) => {
        this.getUser();
      });
    }
  }

  editData(data: Users): void {
    this.openDialog('editAccount', data);
  }

  deleteData(data: Users): void {
    if (data.status !== 'Admin') {
      this.http
        .delete(`${environment.apiUrl}users/` + data.id)
        .subscribe((res) => {
          this.getUser();
        });
    }
  }
}

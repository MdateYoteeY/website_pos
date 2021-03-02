import { Zones } from './../../model/zone.model';
import { TableDialogComponent } from './table-dialog/table-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StatusTables, Tables } from 'src/app/model/table.model';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'zone', 'seat', 'status', 'action'];
  dataSource = new MatTableDataSource<Tables>(ELEMENT_DATA);
  table: Tables;
  zone: Zones[];
  status_table: StatusTables;
  zoneLength: number;

  constructor(private http: HttpClient, public dialog: MatDialog) {}
  search = new FormControl();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getTable();
    this.getZone();
    this.getStatusTable();
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((val) => {
      this.getTable({ zone_id: val });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getZone(): void {
    this.http.get(`${environment.apiUrl}zones`).subscribe((res: Zones[]) => {
      this.zone = res;
      this.zoneLength = res.length;
      console.log(res);
    });
  }

  getStatusTable(): void {
    this.http
      .get(`${environment.apiUrl}status_tables`)
      .subscribe((res: StatusTables) => {
        this.status_table = res;
      });
  }

  getTable(params?: any): void {
    this.http.get(`${environment.apiUrl}tables` , { params }).subscribe((res: Tables[]) => {
      this.dataSource.data = res;
    });
  }

  openDialog(method: string, element?: Tables): void {
    if (method === 'editTable') {
      const dialogRef = this.dialog.open(TableDialogComponent, {
        data: {
          method: method,
          table: element,
          zone: this.zone,
          tableStatus: this.status_table,
        },
      });


    } else if (method === 'addTable') {
      const dialogRef = this.dialog.open(TableDialogComponent, {
        data: {
          method: method,
          zone: this.zone,
          tableStatus: this.status_table,
          zoneLength: this.zoneLength,
        },
      });
    }


    this.dialog.afterAllClosed.subscribe((res) => {
      this.getTable();
    });
  }

  editData(element: Tables): void {
    this.openDialog('editTable', element);
  }

  deleteData(element: Tables): void {
    Swal.fire({
      title: 'คุณแน่ใจใช่ไหม?',
      text: 'คุณต้องการลบโต๊ะ "' + element.table_number + '" ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 235, 156)',
      cancelButtonColor: 'rgb(255, 98, 98)',
      confirmButtonText: 'ยืนยัน',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(`${environment.apiUrl}tables/` + element.id)
          .subscribe((res) => {
            Swal.fire({
              icon: 'success',
              title: 'ลบเรียบร้อยแล้ว!',
              showConfirmButton: false,
              timer: 1500,
            });
            this.getTable();
          });
      }
    });
  }
}

const ELEMENT_DATA: Tables[] = [];

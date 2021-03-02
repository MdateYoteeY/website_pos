import { ZoneDialogComponent } from './zone-dialog/zone-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Zones } from './../../model/zone.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
})
export class ZoneComponent implements AfterViewInit, OnInit {
  form: FormGroup;
  displayedColumns: string[] = ['zone', 'action'];
  dataSource = new MatTableDataSource<Zones>(ELEMENT_DATA);
  zoneLength: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private http: HttpClient, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.getZone();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getZone(): void {
    this.http.get(`${environment.apiUrl}zones`).subscribe((res: Zones[]) => {
      this.dataSource.data = res;
      this.zoneLength = res.length;
    });
  }

  openDialog(method: string, data?: Zones): void {
    if (method === 'addZone') {
      const dialogRef = this.dialog.open(ZoneDialogComponent, {
        data: { method: 'addZone' },
      });
    } else if (method === 'editZone') {
      const dialogRef = this.dialog.open(ZoneDialogComponent, {
        data: { method: 'editZone', zone: data },
      });
    }

    this.dialog.afterAllClosed.subscribe((res) => {
      this.getZone();
    });
  }

  editData(data: Zones): void {
    this.openDialog('editZone', data);
  }

  deleteData(data: Zones): void {
    Swal.fire({
      title: 'คุณแน่ใจใช่ไหม?',
      text: 'คุณต้องการลบโซนที่นั่ง "' + data.name_zone + '" ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 235, 156)',
      cancelButtonColor: 'rgb(255, 98, 98)',
      confirmButtonText: 'ยืนยัน',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`${environment.apiUrl}zones/` + data.id).subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: 'ลบเรียบร้อยแล้ว!',
              showConfirmButton: false,
              timer: 1500,
            });
            this.getZone();
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              text: 'โซนที่นั่งยังมีข้อมูล "โต๊ะที่นั่ง"',
              title: 'เกิดข้อผิดพลาด!',
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(error);
          }
        );
      }
    });
  }
}

const ELEMENT_DATA: Zones[] = [];

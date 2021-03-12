import { Promotion } from './../../model/promotion';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Products } from 'src/app/model/product';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { PromotionsDialogComponent } from './promotions-dialog/promotions-dialog.component';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
})
export class PromotionsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'number',
    'start_date',
    'end_date',
    'status',
    'action',
  ];

  dataSource = new MatTableDataSource<Promotion>(ELEMENT_DATA);

  product: Products;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPromotion();
  }

  openDialog(method: string, element?: Promotion): void {
    if (method === 'editPromotion') {
      const dialogRef = this.dialog.open(PromotionsDialogComponent, {
        data: {
          method: method,
          promotion: element,
        },
      });
    } else if (method === 'addPromotion') {
      const dialogRef = this.dialog.open(PromotionsDialogComponent, {
        data: {
          method: method,
        },
      });
    }

    this.dialog.afterAllClosed.subscribe((res) => {
      // this.getPromotion();
      this.ngOnInit();
    });
  }

  getPromotion(): void {
    this.http
      .get(`${environment.apiUrl}promotions`)
      .subscribe((res: Promotion[]) => {
        this.dataSource.data = res;
        console.log(res);
      });
  }

  editPromotion(element: Promotion): void {
    this.openDialog('editPromotion', element);
  }

  deleteData(element: Promotion): void {
    Swal.fire({
      title: 'คุณแน่ใจใช่ไหม?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 235, 156)',
      cancelButtonColor: 'rgb(255, 98, 98)',
      confirmButtonText: 'ยืนยัน',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(`${environment.apiUrl}promotions/` + element.id)
          .subscribe((res) => {
            Swal.fire({
              icon: 'success',
              title: 'ลบเรียบร้อยแล้ว!',
              showConfirmButton: false,
              timer: 1500,
            });
            this.ngOnInit();
          });
      }
    });
  }
}
const ELEMENT_DATA: Promotion[] = [];

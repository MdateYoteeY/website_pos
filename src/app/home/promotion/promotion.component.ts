import { Promotionitem } from './../../model/promotion';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ListPromotionDialogComponent } from './list-promotion-dialog/list-promotion-dialog.component';
import { PromotionDialogComponent } from './promotion-dialog/promotion-dialog.component';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
})
export class PromotionComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'promotion_name',
    'promotion_discount',
    'date_start',
    'date_end',
    'status',
    'action',
  ];

  dataSource = new MatTableDataSource<Promotion>(ELEMENT_DATA);
  //  stock: Stock[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPromotion();
  }
  getPromotion(params?: any): void {
    this.http
      .get(`${environment.apiUrl}promotions`, { params })
      .subscribe((res: Promotion[]) => {
        this.dataSource.data = res;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialog(method: string, element?: Promotion): void {
    if (method === 'editPromotion') {
      const dialogRef = this.dialog.open(PromotionDialogComponent, {
        data: {
          method: method,
          promotion: element,
        },
      });
    } else if (method === 'addPromotion') {
      const dialogRef = this.dialog.open(PromotionDialogComponent, {
        data: {
          method: method,
        },
      });
    }

    this.dialog.afterAllClosed.subscribe((res) => {
      this.getPromotion();
    });
  }

  editData(element: Promotion): void {
    this.openDialog('editPromotion', element);
  }

  deleteData(element: Promotion): void {
    console.log(element.id);
    Swal.fire({
      title: 'คุณแน่ใจใช่ไหม?',
      text: 'คุณต้องการลบ "' + element.promotion_name + '" ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 235, 156)',
      cancelButtonColor: 'rgb(255, 98, 98)',
      confirmButtonText: 'ยืนยัน',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(`${environment.apiUrl}promotions/` + element.id)
          .subscribe(
            (res) => {
              Swal.fire({
                icon: 'success',
                title: 'ลบโปรโมชั่นสำเร็จ!',
                showConfirmButton: false,
                timer: 1500,
              });
              this.getPromotion();
            },
            (error) => {
              Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด!',
                showConfirmButton: false,
                timer: 1500,
              });
            }
          );
      }
    });
  }

  openList(list): void {
    const ELEMENT_DATA: Promotionitem[] = list;
    const dialogRef = this.dialog.open(ListPromotionDialogComponent, {
      data: ELEMENT_DATA,
      width: '300px',
    });
  }
}

const ELEMENT_DATA: Promotion[] = [];

export interface Promotion {
  id: number;
  status_promotion_id: number;
  promotion_name: string;
  promotion_discount: number;
  date_start: string;
  date_end: string;
  created_at: string;
  updated_at: string;
  image: string;
  status: string;
}

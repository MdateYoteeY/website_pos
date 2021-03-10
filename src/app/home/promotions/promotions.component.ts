import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Products } from 'src/app/model/product';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component';
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

  dataSource = new MatTableDataSource<Promotionitem>(ELEMENT_DATA);

  product: Products;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPromotionitem();
    this.getProduct();
    this.http
      .get(`${environment.apiUrl}promotions`)
      .subscribe((res: Promotionitem[]) => {
        this.dataSource.data = res;
        console.log(res);
      });
  }

  getPromotionitem(): void {
    this.http
      .get(`${environment.apiUrl}promotions`)
      .subscribe((res: Promotionitem[]) => {
        this.dataSource.data = res;
      });
  }
  getProduct() {
    this.http
      .get(`${environment.apiUrl}products`)
      .subscribe((res: Products) => {
        this.product = res;
        console.log(this.product);
      });
  }

  openDialog(method: string, element?: Promotionitem): void {
    if (method === 'editPromotion') {
      const dialogRef = this.dialog.open(PromotionsDialogComponent, {
        data: {
          method: method,
          promotion: element,
          product: this.product,
        },
      });
    } else if (method === 'addPromotion') {
      const dialogRef = this.dialog.open(PromotionsDialogComponent, {
        data: {
          method: method,
          product: this.product,
        },
      });
    }

    this.dialog.afterAllClosed.subscribe((res) => {
      this.getPromotionitem();
    });
  }

  editPromotion(element: Promotionitem): void {
    this.openDialog('editPromotion', element);
  }

  deleteData(element: Promotionitem): void {
    Swal.fire({
      title: 'คุณแน่ใจใช่ไหม?',
      // text: 'คุณต้องการลบโต๊ะ "' + element.id + '" ใช่หรือไม่?',
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
            this.getPromotionitem();
          });
      }
    });
  }
}

const ELEMENT_DATA: Promotionitem[] = [];

export interface Promotionitem {
  id: number;
  promotion_id: number;
  product_id: number;
  promotion_item_amount: number;
  promotion_item_price: number;
  created_at: string;
  updated_at: string;
  product: string;
  promotion: string;
}

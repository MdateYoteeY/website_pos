import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { PromotionDialogComponent } from './promotion-dialog/promotion-dialog.component';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  displayedColumns: string[] = ['id','promotion_name', 'promotion_discount', 'date_start','date_end', 'status', 'action'];

  dataSource = new MatTableDataSource<Promotion>(ELEMENT_DATA);
 //  stock: Stock[];
 @ViewChild(MatPaginator) paginator: MatPaginator;
 constructor(private http: HttpClient,  public dialog: MatDialog) {
 }


 ngOnInit(): void {
   this.getPromotion();


 }
 getPromotion(params?: any): void {
   this.http.get(`${environment.apiUrl}promotions` , { params }).subscribe((res: Promotion[]) => {
     this.dataSource.data = res;
     console.log(res);

   });
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


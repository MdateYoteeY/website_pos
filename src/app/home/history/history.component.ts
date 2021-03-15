import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Orders } from 'src/app/model/order';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { HistoryDialogComponent } from './history-dialog/history-dialog.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'list',
    'number',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<Orders>(ELEMENT_DATA);
  order: Orders;
  i: number;
j: number;
  constructor(private http: HttpClient, public dialog: MatDialog) {}
  search = new FormControl();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getOrder();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getOrder(params?: any): void {
    this.http
      .get(`${environment.apiUrl}orders`, { params })
      .subscribe((res: Orders[]) => {
        this.dataSource.data = res;

        var empire = this.dataSource.data.filter(function (order) {
          return order.status === 'No Success';
        });
        var i = 0;
        var jediScores = empire.map(function () {
          return (i += 1);
        });
        this.i = i;
        console.log(this.i);

        var empire = this.dataSource.data.filter(function (order) {
          return order.status === 'Success';
        });
        var j = 0;
        var jediScores = empire.map(function () {
          return (j += 1);
        });
        this.j = j;
        console.log(this.j);
      });



  }

  openDialog(method: string, element?: Orders): void {
    if (method === 'showOrder') {
      const dialogRef = this.dialog.open(HistoryDialogComponent, {
        data: {
          method: method,
          order: element,
        },
      });

      dialogRef.afterClosed().subscribe((res) => {
        this.getOrder();
      });
    }
  }

  editData(element: Orders): void {
    this.openDialog('showOrder', element);
  }

  deleteData(element: Orders): void {
    Swal.fire({
      title: 'คุณแน่ใจใช่ไหม?',
      text: 'คุณต้องการลบออเดอร์ "' + element.id + '" ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 235, 156)',
      cancelButtonColor: 'rgb(255, 98, 98)',
      confirmButtonText: 'ยืนยัน',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`${environment.apiUrl}orders/` + element.id).subscribe(
          (res) => {
            console.log('order ' + element.id + ' has delete!');
            console.log(res);

            this.getOrder();
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

const ELEMENT_DATA: Orders[] = [];

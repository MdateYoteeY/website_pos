import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Categorys } from 'src/app/model/category';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { CategoriesDialogComponent } from './categories-dialog/categories-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements AfterViewInit, OnInit {
  form: FormGroup;
  displayedColumns: string[] = ['category', 'action'];
  dataSource = new MatTableDataSource<Categorys>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private http: HttpClient, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.getCategory();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getCategory() {
    this.http
      .get<Categorys[]>(`${environment.apiUrl}categories`)
      .subscribe((res) => {
        this.dataSource.data = res;
        console.log(res);
      });
  }

  openDialog(method: string, data?: Categorys): void {
    if (method === 'addCategory') {
      let dialogRef = this.dialog.open(CategoriesDialogComponent, {
        data: { method: 'addCategory' },
      });
      dialogRef.afterClosed().subscribe((res) => {
        this.getCategory();
      });
    } else if (method === 'editCategory') {
      let dialogRef = this.dialog.open(CategoriesDialogComponent, {
        data: { method: 'editCategory', category: data },
      });
      dialogRef.afterClosed().subscribe((res) => {
        this.getCategory();
      });
    }
  }

  editData(data: Categorys): void {
    this.openDialog('editCategory', data);
  }

  deleteData(data: Categorys): void {
    Swal.fire({
      title: 'คุณแน่ใจใช่ไหม?',
      text: 'คุณต้องการลบหมวดหมู่ "' + data.category_name + '" ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 235, 156)',
      cancelButtonColor: 'rgb(255, 98, 98)',
      confirmButtonText: 'ยืนยัน',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(`${environment.apiUrl}categories/` + data.id)
          .subscribe(
            (res) => {
              Swal.fire({
                icon: 'success',
                title: 'ลบเรียบร้อยแล้ว!',
                showConfirmButton: false,
                timer: 1500,
              });
              this.getCategory();
            },
            (error) => {
              Swal.fire({
                icon: 'error',
                text: 'หมวดหมู่มีรายการสินค้าอยู่',
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

const ELEMENT_DATA: Categorys[] = [];

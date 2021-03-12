import { Categorys } from './../../model/category';
import { Types } from './../../model/type';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';
import { StatusTables, Tables } from 'src/app/model/table.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { TableDialogComponent } from '../table/table-dialog/table-dialog.component';
import { TypeDialogComponent } from './type-dialog/type-dialog.component';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss'],
})
export class TypesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'type', 'category', 'action'];
  dataSource = new MatTableDataSource<Types>(ELEMENT_DATA);
  type: Types;
  category: Categorys[];

  constructor(private http: HttpClient, public dialog: MatDialog) {}
  search = new FormControl();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getType();
    this.getCategory();
    this.http.get(`${environment.apiUrl}types`).subscribe((res: Types[]) => {
      this.dataSource.data = res;
      console.log(res);
    });
    // this.search.valueChanges.pipe(debounceTime(500)).subscribe((val) => {
    //   this.getType({ zone_id: val });
    // });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getCategory(): void {
    this.http
      .get(`${environment.apiUrl}categories`)
      .subscribe((res: Categorys[]) => {
        this.category = res;
        console.log(res);
      });
  }

  getType(params?: any): void {
    this.http
      .get(`${environment.apiUrl}types`, { params })
      .subscribe((res: Types[]) => {
        this.dataSource.data = res;
      });
  }

  openDialog(method: string, element?: Types): void {
    let dialogRef;
    if (method === 'editType') {
      dialogRef = this.dialog.open(TypeDialogComponent, {
        data: {
          method: method,
          type: element,
          category: this.category,
        },
      });
    } else if (method === 'addType') {
      dialogRef = this.dialog.open(TypeDialogComponent, {
        data: {
          method: method,
          type: element,
          category: this.category,
        },
      });
    }

    dialogRef.afterAllClosed.subscribe((res) => {
      this.getType();
    });
  }

  editType(element: Types): void {
    this.openDialog('editType', element);
  }

  deleteData(element: Tables): void {
    Swal.fire({
      title: 'คุณแน่ใจใช่ไหม?',
      text: 'คุณต้องการลบโต๊ะ "' + element.id + '" ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 235, 156)',
      cancelButtonColor: 'rgb(255, 98, 98)',
      confirmButtonText: 'ยืนยัน',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(`${environment.apiUrl}type/` + element.id)
          .subscribe((res) => {
            Swal.fire({
              icon: 'success',
              title: 'ลบเรียบร้อยแล้ว!',
              showConfirmButton: false,
              timer: 1500,
            });
            this.getType();
          });
      }
    });
  }
}

const ELEMENT_DATA: Types[] = [];

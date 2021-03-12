import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Categorys } from 'src/app/model/category';
import { environment } from 'src/environments/environment';

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
      });
  }

  openDialog(method: string, data?: Categorys): void {
    let dialogRef;
    if (method === 'addCategory') {
      dialogRef = this.dialog.open(CategoriesDialogComponent, {
        data: { method: 'addCategory' },
      });
    } else if (method === 'editCategory') {
      dialogRef = this.dialog.open(CategoriesDialogComponent, {
        data: { method: 'editCategory', category: data },
      });
    }

    dialogRef.afterClosed().subscribe((res) => {
      this.getCategory();
    });
  }

  editData(data: Categorys): void {
    this.openDialog('editCategory', data);
  }

  deleteData(data: Categorys): void {
    this.http
      .delete(`${environment.apiUrl}categories/` + data.id)
      .subscribe((res) => {
        console.log('Category ' + data.category_name + ' has delete!');
        this.getCategory();
      });
  }
}

const ELEMENT_DATA: Categorys[] = [];

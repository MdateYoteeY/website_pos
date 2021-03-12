import { Products, StatusProducts } from 'src/app/model/product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ProductsDialogComponent } from './products-dialog/products-dialog.component';
import { Categorys } from 'src/app/model/category';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Types } from 'src/app/model/type';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'type',
    'price',
    'amount',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<Products>(ELEMENT_DATA);
  product: Products;
  type: Types;
  statusproduct: StatusProducts;

  constructor(private http: HttpClient, public dialog: MatDialog) {}
  search = new FormControl();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getProduct();
    this.getType();
    this.getstatus_product();
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((val) => {
      this.getProduct({ keywords: val });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getType(): void {
    this.http.get(`${environment.apiUrl}types`).subscribe((res: Types) => {
      this.type = res;
    });
  }

  getstatus_product(): void {
    this.http
      .get(`${environment.apiUrl}status_products`)
      .subscribe((res: StatusProducts) => {
        this.statusproduct = res;
      });
  }

  getProduct(params?: any): void {
    this.http
      .get(`${environment.apiUrl}products`, { params })
      .subscribe((res: Products[]) => {
        this.dataSource.data = res;
      });
  }

  openDialog(method: string, element?: Products): void {
    let dialogRef;
    if (method === 'editProduct') {
      dialogRef = this.dialog.open(ProductsDialogComponent, {
        data: {
          method: method,
          product: element,
          type: this.type,
          statusproduct: this.statusproduct,
        },
      });
    } else if (method === 'addProduct') {
      dialogRef = this.dialog.open(ProductsDialogComponent, {
        data: {
          method: method,
          type: this.type,
          statusproduct: this.statusproduct,
        },
      });
    }

    dialogRef.afterClose().subscribe((res) => {
      this.getProduct();
    });
  }

  editData(element: Products): void {
    this.openDialog('editProduct', element);
  }
  deleteData(element: Products): void {
    console.log(element.id);
    console.log(environment.apiUrl);

    this.http
      .delete(`${environment.apiUrl}products/` + element.id)
      .subscribe((res) => {
        console.log('product ' + element.id + ' has delete!');
        console.log(res);

        this.getProduct();
      });
  }
}

const ELEMENT_DATA: Products[] = [];

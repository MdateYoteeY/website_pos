import { element } from 'protractor';
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
import Swal from 'sweetalert2';

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
  category: Categorys;
  statusproduct: StatusProducts;

  constructor(private http: HttpClient, public dialog: MatDialog) {}
  search = new FormControl();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getProduct();
    this.getCategory();
    this.getstatus_product();

    this.search.valueChanges.pipe(debounceTime(500)).subscribe((val) => {
      this.getProduct({ keywords: val });
    });
  }

  getCategory(): void {
    this.http
      .get(`${environment.apiUrl}categories`)
      .subscribe((res: Categorys) => {
        this.category = res;
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
        this.dataSource.paginator = this.paginator;
        console.log(res);
      });
  }

  openDialog(method: string, element?: Products): void {
    if (method === 'editProduct') {
      let dialogRef = this.dialog.open(ProductsDialogComponent, {
        data: {
          method: method,
          product: element,
          category: this.category,
        },
      });
      dialogRef.afterClosed().subscribe((res) => {
        this.getProduct();
      });
    } else if (method === 'addProduct') {
      let dialogRef = this.dialog.open(ProductsDialogComponent, {
        data: {
          method: method,
          category: this.category,
        },
      });
      dialogRef.afterClosed().subscribe((res) => {
        this.getProduct();
      });
    }
  }

  editData(element: Products): void {
    this.openDialog('editProduct', element);
  }
  deleteData(element: Products): void {
    Swal.fire({
      title: 'คุณแน่ใจใช่ไหม?',
      text: 'คุณต้องการลบสินค้า "' + element.product_name + '" ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 235, 156)',
      cancelButtonColor: 'rgb(255, 98, 98)',
      confirmButtonText: 'ยืนยัน',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(`${environment.apiUrl}products/` + element.id)
          .subscribe(
            (res) => {
              Swal.fire({
                icon: 'success',
                title: 'ลบเรียบร้อยแล้ว!',
                showConfirmButton: false,
                timer: 1500,
              });
              this.getProduct();
            },
            (error) => {
              console.log(error);

              Swal.fire({
                icon: 'error',
                text: 'เกิดข้อผิดพลาดในการลบสินค้า',
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

const ELEMENT_DATA: Products[] = [];

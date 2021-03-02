import { CategoryComponent } from './category/category.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

import { HomeRoutingModule } from './home-routing.module';
import { ProductComponent } from './product/page1.component';
import { StockProductComponent } from './stock-product/page2.component';
import { ReportComponent } from './report/page3.component';
import { PromotionComponent } from './promotion/promotion.component';
import { MainComponent } from './main/main.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogComponent } from './dialog/dialog.component';
import { AccountComponent } from './account/account.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ZoneComponent } from './zone/zone.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZoneDialogComponent } from './zone/zone-dialog/zone-dialog.component';
import { TableComponent } from './table/table.component';
import { TableDialogComponent } from './table/table-dialog/table-dialog.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesDialogComponent } from './categories/categories-dialog/categories-dialog.component';
import { ProductsComponent } from './products/products.component';
import { ProductsDialogComponent } from './products/products-dialog/products-dialog.component';
import { StockDialogComponent } from './stock-product/stock-dialog/stock-dialog.component';
import { PromotionDialogComponent } from './promotion/promotion-dialog/promotion-dialog.component';
@NgModule({
  declarations: [
    ProductComponent,
    StockProductComponent,
    ReportComponent,
    PromotionComponent,
    MainComponent,
    DialogComponent,
    AccountComponent,
    ZoneComponent,
    ZoneDialogComponent,
    TableComponent,
    TableDialogComponent,
    CategoriesComponent,
    CategoriesDialogComponent,
    ProductsComponent,
    ProductsDialogComponent,
    StockDialogComponent,
    PromotionDialogComponent,
    CategoryComponent,
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HomeRoutingModule,
    MatTableModule,
    MatListModule,
    MatSelectModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class HomeModule {}

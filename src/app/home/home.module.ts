import { InterceptorService } from './loader/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { StockAddDialogComponent } from './stock-product/stock-add-dialog/stock-add-dialog.component';
import { ListPromotionDialogComponent } from './promotion/list-promotion-dialog/list-promotion-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { StockEditDailogComponent } from './stock-product/stock-edit-dailog/stock-edit-dailog.component';
import { TypesComponent } from './types/types.component';
import { TypeDialogComponent } from './types/type-dialog/type-dialog.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { PromotionsDialogComponent } from './promotions/promotions-dialog/promotions-dialog.component';
import { PromotionEditComponent } from './promotions/promotion-edit/promotion-edit.component';
import { HistoryComponent } from './history/history.component';
import { HistoryDialogComponent } from './history/history-dialog/history-dialog.component';
import { AppComponent } from '../app.component';

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
    StockAddDialogComponent,
    ListPromotionDialogComponent,
    StockEditDailogComponent,
    TypesComponent,
    TypeDialogComponent,
    PromotionsComponent,
    PromotionsDialogComponent,
    PromotionEditComponent,
    HistoryComponent,
    HistoryDialogComponent,
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HomeRoutingModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatListModule,
    MatSelectModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatAutocompleteModule,
    MaterialFileInputModule,
    MatDividerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
})
export class HomeModule {}

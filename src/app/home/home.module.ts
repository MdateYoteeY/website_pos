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

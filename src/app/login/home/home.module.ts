import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ProductComponent } from './product/page1.component';
import { StockProductComponent } from './stock-product/page2.component';
import { ReportComponent } from './report/page3.component';
import { PromotionComponent } from './promotion/promotion.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [ProductComponent, StockProductComponent, ReportComponent, PromotionComponent, MainComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}

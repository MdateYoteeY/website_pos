import { MainComponent } from './main/main.component';
import { PromotionComponent } from './promotion/promotion.component';
import { ReportComponent } from './report/page3.component';
import { StockProductComponent } from './stock-product/page2.component';
import { ProductComponent } from './product/page1.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: MainComponent,
      },
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'promotion',
        component: PromotionComponent,
      },
      {
        path: 'stock-product',
        component: StockProductComponent,
      },
      {
        path: 'report',
        component: ReportComponent,
      },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

import { CategoryComponent } from './category/category.component';
import { TableComponent } from './table/table.component';
import { ZoneComponent } from './zone/zone.component';
import { LoginComponent } from './../login/login.component';
import { AccountComponent } from './account/account.component';
import { MainComponent } from './main/main.component';
import { PromotionComponent } from './promotion/promotion.component';
import { ReportComponent } from './report/page3.component';
import { StockProductComponent } from './stock-product/page2.component';
import { ProductComponent } from './product/page1.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'main',
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
      {
        path: 'zone',
        component: ZoneComponent,
      },
      {
        path: 'users',
        component: AccountComponent,
        loadChildren: () =>
          import('../../app/home/account/account.module').then(
            (m) => m.AccountModule
          ),
      },
      { path: 'table', component: TableComponent },
      {
        path: 'category',component: CategoryComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

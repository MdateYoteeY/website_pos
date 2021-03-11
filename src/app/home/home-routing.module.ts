import { CategoryComponent } from './category/category.component';
import { TableComponent } from './table/table.component';
import { ZoneComponent } from './zone/zone.component';
import { LoginComponent } from './../login/login.component';
import { AccountComponent } from './account/account.component';
import { MainComponent } from './main/main.component';
import { PromotionComponent } from './promotion/promotion.component';
import { ReportComponent } from './report/page3.component';
import { StockProductComponent } from './stock-product/page2.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { TypesComponent } from './types/types.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { HistoryComponent } from './history/history.component';

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
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'promotions',
        component: PromotionsComponent,
      },
      {
        path: 'stock-product',
        component: StockProductComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'type',
        component: TypesComponent,
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
        path: 'history',
        component: HistoryComponent,
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
        path: 'category',
        component: CategoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

import { AuthGuard } from './../_helpers/auth.guard';
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
    // canActivate: [AuthGuard],
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
        path: 'users',
        component: AccountComponent,
        loadChildren: () =>
          import('../../app/home/account/account.module').then(
            (m) => m.AccountModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

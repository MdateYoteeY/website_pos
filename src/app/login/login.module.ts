import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { HomeComponent } from './home/home.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, LoginRoutingModule, MatListModule],
})
export class LoginModule {}

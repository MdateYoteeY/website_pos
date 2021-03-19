import { UserLogin } from './../model/model.model';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

import { Router, Event as RouterEvent } from '@angular/router';
import { LoaderService } from './loader/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userModel: UserLogin;
  // public loading = true;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public loaderService: LoaderService
  ) {}

  get loading$() {
    return this.loaderService.isLoading$;
  }

  ngOnInit(): void {
    this.userModel = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.userModel);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}

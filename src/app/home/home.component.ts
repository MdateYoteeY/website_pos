import { UserLogin } from './../model/model.model';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

import { Router, Event as RouterEvent } from '@angular/router';
import { LoaderService } from './loader/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userModel: UserLogin;
  // public loading = true;
  imageProfile: string;
  defaultImage = '../../assets/defaultPicture.png';

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

    this.imageProfile =
      `${environment.apiUrl}` + this.userModel.data_user.image;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}

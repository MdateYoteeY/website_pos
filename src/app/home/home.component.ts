import { UserLogin } from './../model/model.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Users } from '../model/model.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userModel: UserLogin;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.userModel = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.userModel);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}

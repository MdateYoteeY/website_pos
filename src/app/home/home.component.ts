import { UserLogin } from './../model/model.model';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Users } from '../model/model.model';

import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { LoaderService } from './loader/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userModel: UserLogin;
  public loading = true;

  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public loaderService: LoaderService
  ) {
    this.router.events.subscribe((e: RouterEvent) => {
      this.navigationInterceptor(e);
    });

    this.lottieConfig = {
      path: '../../assets/timer_loading.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true,
    };
  }

  ngOnInit(): void {
    this.userModel = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.userModel);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
      this.anim.play();
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
      this.anim.pause();
      this.anim.stop();
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
      this.anim.pause();
      this.anim.stop();
    }
    if (event instanceof NavigationError) {
      this.loading = false;
      this.anim.pause();
      this.anim.stop();
    }
  }

  handleAnimation(anim: any) {
    this.anim = anim;
  }

  stop() {
    this.anim.stop();
  }

  play() {
    this.anim.play();
  }

  pause() {
    this.anim.pause();
  }

  setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.anim.setSpeed(speed);
  }
}

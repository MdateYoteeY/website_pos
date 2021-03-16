import { Component } from '@angular/core';

import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'POS';
  loading = true;

  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;

  constructor(private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });

    this.lottieConfig = {
      path: '../assets/timer_loading.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true,
    };
  }

  // Shows and hides the loading spinner during RouterEvent changes
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

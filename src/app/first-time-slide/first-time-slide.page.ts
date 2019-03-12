import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-first-time-slide',
  templateUrl: './first-time-slide.page.html',
  styleUrls: ['./first-time-slide.page.scss'],
})
export class FirstTimeSlidePage implements OnInit {
  slideOpts = {
    effect: 'flip'
  };
  proceed = false;
  constructor(private network: Network, private router: Router) {
    // watch network for a disconnection
    this.network.onDisconnect().subscribe(() => {
      this.router.navigateByUrl('/network-error');
    });
  }

  ngOnInit() {
  }

  checkFirstTime() {
    localStorage.setItem('firstTimeConfirmation', JSON.stringify(true));
    this.router.navigateByUrl('/home');
  }
  checkChanged(event) {
    if (event.detail.checked) {
      this.proceed = true;
    } else if (!event.detail.checked) {
      this.proceed = false;
    }
  }
}

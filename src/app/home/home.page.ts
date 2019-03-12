import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  key;

  constructor(private router: Router, private network: Network) {
    let confirmation = localStorage.getItem('firstTimeConfirmation');
    if (localStorage.getItem('firstTimeConfirmation') != null) {
      if (JSON.parse(confirmation) == true) {
        this.router.navigateByUrl('/home');
      }
    } else {
      this.router.navigateByUrl('/first-time-slide');
    }

    if (localStorage.getItem('key')) {
      this.key = JSON.parse(localStorage.getItem('key')).success;
    }
    
    // watch network for a disconnection
    this.network.onDisconnect().subscribe(() => {
      this.router.navigateByUrl('/network-error');
    });

  }

}

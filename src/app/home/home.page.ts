import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  key;
  userDataInterval;

  constructor(private router: Router, private network: Network, public http: HttpClient) {
    let confirmation = localStorage.getItem('firstTimeConfirmation');
    if (localStorage.getItem('firstTimeConfirmation') != null) {
      if (JSON.parse(confirmation) == true) {
        this.router.navigateByUrl('/home');
      }
    } else {
      this.router.navigateByUrl('/first-time-slide');
    }

    this.network.onDisconnect().subscribe(() => {
      this.router.navigateByUrl('/network-error');
    });

  }

  ionViewWillEnter() {
    if (localStorage.getItem('key')) {
      this.key = JSON.parse(localStorage.getItem('key')).success;
      this.keepUpdatingUserData();
    }
  }

  ionViewWillLeave() {
    clearInterval(this.userDataInterval);
  }

  keepUpdatingUserData() {
      clearInterval(this.userDataInterval);
      this.userDataInterval = setInterval(() => {
        this.getUserData();
      }, 18000)
  }

  getUserData() {
    this.http.get('https://papacria-dev-space-danielbueno.c9users.io/api/userData/' + this.key.id_user).subscribe((response) => {
      this.key.name = response['name'];
      this.key.validGeos = response['validGeos'];
      this.key.score = response['score'];
      this.key.numPhotos = response['numPhotos'];
      this.key.avatar = response['avatar'];
    });
  }




}

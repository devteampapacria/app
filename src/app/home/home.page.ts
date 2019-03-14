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
  lastTime;

  constructor(private router: Router, private network: Network, public http: HttpClient) {
    this.lastTime = new Date().getTime();
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

    if (this.key) {
      this.keepUpdatingUserData();
    }
    
    // watch network for a disconnection
    this.network.onDisconnect().subscribe(() => {
      this.router.navigateByUrl('/network-error');
    });
    
  }

  keepUpdatingUserData() {
    setInterval(function(){
      this.http.get('https://papacria-dev-space-danielbueno.c9users.io/api/userData/' + this.key.id_user).subscribe((response) => {
        let userData = response;
        this.key.name = userData.name;
        this.key.validGeos = userData.validGeos;
        this.key.score = userData.score;
        this.key.numPhotos = userData.numPhotos;
        this.key.avatar = userData.avatar;
      });
    }, 1800);
  }


}

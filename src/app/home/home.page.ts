import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Network } from '@ionic-native/network/ngx';
import { ActivatedRoute } from '@angular/router';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  key;
  userDataInterval;
  images: any;
  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    spaceBetween: 30,
    centeredSlides: true
  };
  isLoading = false;

  constructor(private router: Router, private network: Network, public http: HttpClient, private modalController: ModalController, private route: ActivatedRoute, private platform: Platform) {
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

    this.getImgs();
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

  getImgs() {
    this.isLoading = true;
    this.http.get('https://papacria-dev-space-danielbueno.c9users.io/api/randomGeoImages').subscribe((response) => {
      this.images = response;
      for (let i = 0; i < this.images.length; i++) {
        this.images[i].loaded = false;
      }
    })
    
    this.isLoading = false;
  }

  openPreview(index, referer) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: index,
        referer: referer
      }
    }).then(modal => {
      modal.present();
    });
  }




}

import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { CerrarsesionService } from '../app/services/cerrarsesion.service';
import { MenuController } from '@ionic/angular';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Mis Geolocalizaciones',
      url: '/mis-geolocalizaciones',
      icon: 'pin'
    },
    {
      title: 'Clasificación',
      url: '/clasificacion',
      icon: 'star-half'
    }
  ];
    isLogged = false;
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private fcm: FCM,
        private router: Router,
        private sesion: CerrarsesionService,
        private menu: MenuController
    ) {
        this.initializeApp();
    }

    ionViewWillEnter() {
      if (localStorage.getItem('key')) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
        this.fcm.getToken().then(token => {
            console.log(token);
        });
        this.fcm.onTokenRefresh().subscribe(token => {
            console.log(token);
        });
        this.fcm.onNotification().subscribe(data => {
            console.log(data);
            if (data.wasTapped) {
                console.log('Received in background');
                this.router.navigate([data.landing_page, data.price]);
            } else {
                console.log('Received in foreground');
                this.router.navigate([data.landing_page, data.price]);
            }
        });
    }

    cerrarSesion() {
      this.sesion.presentAlertConfirm();
      this.menu.close();
    }
}

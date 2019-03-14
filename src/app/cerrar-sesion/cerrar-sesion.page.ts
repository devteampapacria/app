import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.page.html',
  styleUrls: ['./cerrar-sesion.page.scss'],
})
export class CerrarSesionPage {

  constructor(public alertController: AlertController, private network: Network, private router: Router,) {
    this.presentAlertConfirm();
   }

  async presentAlertConfirm() {
    let alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.router.navigateByUrl('/home');
          }
        }, {
          text: 'Cerrar sesión',
          handler: () => {
            localStorage.removeItem('key');
            this.router.navigateByUrl('/home');
          }
        }
      ]
    });

    await alert.present();
  }
}

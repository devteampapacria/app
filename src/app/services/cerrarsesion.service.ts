import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class CerrarsesionService {

  constructor(public alertController: AlertController, private network: Network, private router: Router) {
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
            localStorage.removeItem('firstTimeConfirmation');
            this.router.navigateByUrl('/login');
          }
        }
      ]
    });
    await alert.present();
    
  }
}

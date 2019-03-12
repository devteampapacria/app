import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from "@ionic/angular";
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage {
  constructor(private network: Network, private router: Router, private platform: Platform) {
    // watch network for a disconnection
    this.network.onDisconnect().subscribe(() => {
      this.router.navigateByUrl('/network-error');
    });

    this.platform.backButton.subscribe(() => {
      this.router.navigateByUrl('home');
    })
  }
}

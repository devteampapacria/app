import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  constructor(private network: Network, private router: Router) {
    // watch network for a disconnection
    this.network.onDisconnect().subscribe(() => {
      this.router.navigateByUrl('/network-error');
    });
  }


  ngOnInit() {
  }

}

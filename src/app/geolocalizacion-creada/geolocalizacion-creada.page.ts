import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-geolocalizacion-creada',
  templateUrl: './geolocalizacion-creada.page.html',
  styleUrls: ['./geolocalizacion-creada.page.scss'],
})
export class GeolocalizacionCreadaPage implements OnInit {

  constructor(private network: Network, private router: Router) {
    // watch network for a disconnection
    this.network.onDisconnect().subscribe(() => {
      this.router.navigateByUrl('/network-error');
    });
  }

  ngOnInit() {
  }

}

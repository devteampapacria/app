import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.page.html',
  styleUrls: ['./clasificacion.page.scss'],
})
export class ClasificacionPage implements OnInit {
  key;
  rankings;
  userData;
  noData;

  constructor(public router: Router, public http: HttpClient, private network: Network) {
    //control de logeo
    try {
      console.log('entro en logeo')
      this.key = JSON.parse(localStorage.getItem("key"));
      console.log(this.key.success);
    } catch (e) {
      this.router.navigateByUrl('/login');
    }
    // watch network for a disconnection
    this.network.onDisconnect().subscribe(() => {
      this.router.navigateByUrl('/network-error');
    });
    //fin control de logeo
    this.getRankings();
  }

  ngOnInit() {
  }

  getRankings() {
    this.http.get('https://papacria-dev-space-danielbueno.c9users.io/api/rankings').subscribe((response) => {
      this.rankings = response;
      let index = this.rankings.findIndex(x => x.id == this.key.success.id_user);
      if (index != -1) {
        this.userData = this.rankings[index];
      } else {
        this.noData = "No tienes todavía ninguna geolocalización verificada";
      }
    })
  }
}

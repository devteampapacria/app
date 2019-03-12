import { Component, OnInit } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { HttpClient } from '@angular/common/http';
import { Platform } from "@ionic/angular";
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

/// <reference path="./types/MicrosoftMaps/Microsoft.Maps.All.d.ts"/>

@Component({
  selector: 'app-mis-geolocalizaciones',
  templateUrl: './mis-geolocalizaciones.page.html',
  styleUrls: ['./mis-geolocalizaciones.page.scss'],
})
export class MisGeolocalizacionesPage implements OnInit {
  map;
  loadPromise: Promise<void>;
  latitude;
  longitude;
  puntos;
  pinClicked;
  isLoading = true;
  key;
  ngOnInit() {
  }

  constructor(private network: Network, private platform: Platform, public router: Router, public geolocation: Geolocation, public http: HttpClient) {
    // watch network for a disconnection
    this.network.onDisconnect().subscribe(() => {
      this.router.navigateByUrl('/network-error');
    });

    var options = {
      enableHighAccuracy: true,
      timeout: 60000,
      maximumAge: 30000
    };
    //control de logeo
    try {
      console.log('entro en logeo')
      this.key = JSON.parse(localStorage.getItem("key"));
      console.log(this.key.success.id_user);
    } catch (e) {
      this.router.navigateByUrl('/login');
    }
    //fin control de logeo

    console.log(this.key.success.id_user);
    // fin control de logeo

    this.platform.ready().then(() => {
      this.load().then(() => {

        this.geolocation.getCurrentPosition(options).then((resp) => {
          this.map = new Microsoft.Maps.Map(document.getElementById("myMap"), {
            center: new Microsoft.Maps.Location(
              resp.coords.latitude,
              resp.coords.longitude
            ),
            zoom: 6,
          });
          this.addPoints();
          this.changeView();
          this.isLoading = false;
        })
          .catch((error) => {
            this.map = new Microsoft.Maps.Map(document.getElementById("myMap"), {
              center: new Microsoft.Maps.Location(29.011036199999996, -13.5494869),
              zoom: 12
            });
            this.addPoints();
            this.isLoading = false;
          });
      });
    })

    this.pinClicked = function (e) {
      router.navigateByUrl('/geolocalizacion/' + e.target.metadata.id);
    }
  }

  changeView() {
    this.map.setView({
      mapTypeId: Microsoft.Maps.MapTypeId.aerial
    });
  }

  addPoints() {
    this.http.get('https://papacria-dev-space-danielbueno.c9users.io/api/misGeolocalizacionesAPI/' + this.key.success.id_user).subscribe((response) => {
      this.puntos = response;
      for (let i = 0; i < this.puntos.length; i++) {
        let pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(response[i].latitud, response[i].longitud), {
          icon: (response[i].recogido != 0 ? './assets/dot_picked_rescaled.png' : './assets/dot_not_picked_rescaled.png'),
        })
        pin.metadata = { id: response[i].id };
        this.map.entities.push(pin);
        Microsoft.Maps.Events.addHandler(pin, 'click', this.pinClicked);
      }
    })
  }

  load(): Promise<void> {
    if (this.loadPromise) {
      return this.loadPromise;
    }

    let script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.defer = true;

    let mapsCallback = "bingMapsCallback";
    script.src = `https://www.bing.com/api/maps/mapcontrol?key=AiPNpJbR0CHbSbndZwKAnwUeX2kGc8dW0zICvtGlDjQKS3yoham-zKL7iQsCHLss&callback=bingMapsCallback`;

    this.loadPromise = new Promise<void>(
      (resolve: Function, reject: Function) => {
        window[mapsCallback] = () => {
          resolve();
        };
        script.onerror = (error: Event) => {
          console.error("maps script error" + error);
          reject(error);
        };
      }
    );

    document.body.appendChild(script);

    return this.loadPromise;
  }



}

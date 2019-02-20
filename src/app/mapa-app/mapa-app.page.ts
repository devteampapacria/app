import { Component, OnInit } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { HttpClient } from '@angular/common/http';

/// <reference path="./types/MicrosoftMaps/Microsoft.Maps.All.d.ts"/>

@Component({
  selector: 'app-mapa-app',
  templateUrl: './mapa-app.page.html',
  styleUrls: ['./mapa-app.page.scss'],
})
export class MapaAppPage implements OnInit {
  address: string;
  map;
  loadPromise: Promise<void>;
  addressEntered = false;
  addressExists = false;
  latitude;
  longitude;
  puntos;

  ngOnInit() {
  }

  constructor(public geolocation: Geolocation, private http: HttpClient) {
    var options = {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 0
    };

    this.load().then(() => {
      console.log("Maps loaded");

      this.geolocation.getCurrentPosition(options).then((resp) => {
        this.map = new Microsoft.Maps.Map(document.getElementById("myMap"), {
          center: new Microsoft.Maps.Location(
            resp.coords.latitude,
            resp.coords.longitude
          ),
          zoom: 6
        });
        this.addPoints();
      })
        .catch((error) => {
          this.map = new Microsoft.Maps.Map(document.getElementById("myMap"), {
            center: new Microsoft.Maps.Location(29.011036199999996, -13.5494869),
            zoom: 12
          });
          this.addPoints();
        });
    });
  }

  addPoints() {
    this.http.get('https://papacria-dev-space-danielbueno.c9users.io/api/puntos').subscribe((response) => {
      this.puntos = response;
      for (let i = 0; i < this.puntos.length; i++) {
        this.map.entities.push(new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(response[i].latitud, response[i].longitud)));
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
    // Replace YOUR_BING_MAPS_API_KEY with your API key
    script.src = `https://www.bing.com/api/maps/mapcontrol?key=AiPNpJbR0CHbSbndZwKAnwUeX2kGc8dW0zICvtGlDjQKS3yoham-zKL7iQsCHLss&callback=bingMapsCallback`;

    this.loadPromise = new Promise<void>(
      (resolve: Function, reject: Function) => {
        window[mapsCallback] = () => {
          console.log("inside maps callback");
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

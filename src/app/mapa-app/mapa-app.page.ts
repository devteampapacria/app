import { Component, OnInit } from '@angular/core';
import { NavController } from "ionic-angular";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { Geolocation } from "@ionic-native/geolocation/ngx";

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

  ngOnInit() {
  }

  constructor(public geolocation: Geolocation) {
    var options = {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 0
    };
    // Load the map
    this.load().then(() => {
      console.log("Maps loaded");

      // Request user's location
      this.geolocation.getCurrentPosition(options).then((resp) => {
          // resp.coords.latitude
          // resp.coords.longitude
          console.log(resp);

          // Change map's view to match user's location
          this.map = new Microsoft.Maps.Map(document.getElementById("myMap"), {
            center: new Microsoft.Maps.Location(
              23.284,
              17.548
            ),
            zoom: 12
          });

          // Attach Autosuggest
          Microsoft.Maps.loadModule("Microsoft.Maps.AutoSuggest", () => {
            var options = {
              maxResults: 4,
              map: this.map
            };
            var manager = new Microsoft.Maps.AutosuggestManager(options);
            manager.attachAutosuggest(
              "#searchBox",
              "#searchBoxContainer",
              result => {
                this.addressEntered = true;
                this.map.entities.clear();

                this.map.setView({ bounds: result.bestView });
                var pushpin = new Microsoft.Maps.Pushpin(result.location);
                this.map.entities.push(pushpin);
                this.address = result.formattedSuggestion;
                this.latitude = result.location.latitude;
                this.longitude = result.location.longitude;
              }
            );
          });
        })
        .catch((error) => {

          // User denied permission to his location, so show default location

          console.log("Error getting location", error);
          this.map = new Microsoft.Maps.Map(document.getElementById("myMap"), {
            center: new Microsoft.Maps.Location(39.9612, -82.9988),
            zoom: 12
          });
          Microsoft.Maps.loadModule("Microsoft.Maps.AutoSuggest", () => {
            var options = {
              maxResults: 4,
              map: this.map
            };
            var manager = new Microsoft.Maps.AutosuggestManager(options);
            manager.attachAutosuggest(
              "#searchBox",
              "#searchBoxContainer",
              result => {
                this.addressEntered = true;
                this.map.entities.clear();

                this.map.setView({ bounds: result.bestView });
                var pushpin = new Microsoft.Maps.Pushpin(result.location);
                this.map.entities.push(pushpin);
                this.address = result.formattedSuggestion;
                this.latitude = result.location.latitude;
                this.longitude = result.location.longitude;
              }
            );
          });
        });
    });
  }

  // Load the map and return a promise
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
    script.src = `https://www.bing.com/api/maps/mapcontrol?key=YOUR_BING_MAPS_API_KEY&callback=bingMapsCallback`;

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

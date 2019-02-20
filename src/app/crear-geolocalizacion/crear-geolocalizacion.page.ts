import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

/// <reference path="./types/MicrosoftMaps/Microsoft.Maps.All.d.ts"/>

@Component({
  selector: 'app-crear-geolocalizacion',
  templateUrl: './crear-geolocalizacion.page.html',
  styleUrls: ['./crear-geolocalizacion.page.scss'],
})
export class CrearGeolocalizacionPage implements OnInit {
  images = [null, null, null, null];
  BreakException = {};
  space = false;
  latitud = 1;
  longitud = 1;
  isLoading = false;

  constructor(private router: Router, private http: HttpClient, private camera: Camera, private geolocation: Geolocation) {
    var options = {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 0
    };

    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.latitud = resp.coords.latitude;
      this.longitud = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  ngOnInit() {}

  takePicture() {
    this.isLoading = true;
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.images.forEach((element, index) => {
        if (element == null) {
          this.images[index] = 'data:image/jpeg;base64,' + imageData;
          this.space = true;
          throw this.BreakException;
        }
      });
      if (!this.space) {
        this.space = false;
      } else {
        alert('Limite de imagenes por geolocalización alcanzado')
      }
    }, (err) => {
      console.log("Camera issue:" + err);
    });
    this.isLoading = false;
  }

  deletePicture(index) {
    if (this.images[index]) {
      this.images[index] = null;
    } else {
      alert("Couldn't find the index in array, index=" + index);
    }
  }

  createGeolocation(descriptArea: string) {

    if (this.images[0] != null) {
      this.isLoading = true;
      let acceptedImages = [];
      let punto = {
        "latitud": this.latitud,
        "longitud": this.longitud,
        "descripcion": descriptArea,
        "imagenes": this.images,
        "recogido": 0,
      }

      this.http.post("https://papacria-dev-space-danielbueno.c9users.io/api/crearPunto", punto, { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Accept": 'application/json' }) })
        .subscribe(data => {
          this.isLoading = false;
          this.router.navigateByUrl('/geolocalizacion-creada');
        }, error => {
          alert('error');
          this.isLoading = false;
        });
    } else {
      alert('No sacado ninguna foto');
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HTTP } from '@ionic-native/http/ngx';

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

  constructor(private camera: Camera, private geolocation: Geolocation, private http: HTTP) {
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

  ngOnInit() {

  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
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
        alert('Foto añadida correctamente');
        this.space = false;
      } else {
        alert('mi ninio que no queda espacio, gilipollas')
      }
    }, (err) => {
      console.log("Camera issue:" + err);
    });
  }

  deletePicture(index) {
    if (this.images[index]) {
      this.images[index] = null;
    } else {
      alert("Couldn't find the index in array, index=" + index);
    }
  }

  createGeolocation() {
    this.http.get('url', {}, {})
      .then(data => {
        console.log(data.data); // data received by server

      })
      .catch(error => {
        console.log(error.error); // error message as string
      });
  }
}
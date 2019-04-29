import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Platform } from "@ionic/angular";
import { Network } from '@ionic-native/network/ngx';

@Component({
    selector: 'app-crear-geolocalizacion',
    templateUrl: './crear-geolocalizacion.page.html',
    styleUrls: ['./crear-geolocalizacion.page.scss'],
})
export class CrearGeolocalizacionPage {
    images = [null, null, null, null];
    BreakException = {};
    space = false;
    latitud = null;
    longitud = null;
    isLoading = false;
    descriptArea;
    key;
    isGeoActive = false;

    constructor(private network: Network, private platform: Platform, private router: Router, private http: HttpClient, private camera: Camera, private geolocation: Geolocation) {
        // watch network for a disconnection
        this.network.onDisconnect().subscribe(() => {
            this.router.navigateByUrl('/network-error');
        });
        var options = {
            enableHighAccuracy: true,
            timeout: 60000,
            maximumAge: 30000
        };
        this.platform.backButton.subscribe(() => {
            this.router.navigateByUrl('home');
        })

        try {
            this.key = JSON.parse(localStorage.getItem("key"));
            if (this.key == null) throw "";
        } catch (e) {
            this.router.navigateByUrl('/login');
        }

        this.platform.ready().then(() => {
            this.geolocation.getCurrentPosition(options).then((resp) => {
                this.latitud = resp.coords.latitude;
                this.longitud = resp.coords.longitude;
                this.isGeoActive = true;
                this.isLoading = false;
            }).catch((error) => {
                alert("No podemos encontrar tu ubicación, asegurate de que la aplicación tiene permiso para utilizar tu ubicación");
                this.latitud = null;
                this.longitud = null;
                this.isGeoActive = false;
            });

        });

    }

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
        if (this.images[0] != null && descriptArea != undefined) {
            this.isLoading = true;
            let acceptedImages = [];

            let punto = {
                "latitud": this.latitud,
                "longitud": this.longitud,
                "descripcion": descriptArea,
                "imagenes": this.images,
                "recogido": 0,
                "user_id": this.key.id_user,
                "key": this.key.token
            }


            this.http.post("https://papacria-dev-space-danielbueno.c9users.io/api/crearPunto", punto, { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Accept": 'application/json' }) })
                .subscribe(data => {
                    this.isLoading = false;
                    this.router.navigateByUrl('/geolocalizacion-creada');
                }, error => {
                    alert('Hay un problema con el servidor');
                    this.isLoading = false;
                });
        } else {
            alert('No has sacado ninguna foto o no has puesto una descripción, ambos son obligatorios');
        }
    }
}
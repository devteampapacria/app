import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Platform } from "@ionic/angular";

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
    descriptArea;
    key;

    constructor(private platform: Platform, private router: Router, private http: HttpClient, private camera: Camera, private geolocation: Geolocation) {
        var options = {
            enableHighAccuracy: true,
            timeout: 60000,
            maximumAge: 30000
        };
        this.platform.backButton.subscribe(() => {
            this.router.navigateByUrl('home');
        })
        //control de logeo
        try {
            this.key = JSON.parse(localStorage.getItem("key"));
            console.log(this.key.success.id_user);
        } catch (e) {
            this.router.navigateByUrl('/login');
        }
        //fin control de logeo

        console.log(this.key.success.id_user);
        // fin control de logeo
        this.platform.ready().then(() => {
            this.geolocation.getCurrentPosition(options).then((resp) => {
                this.latitud = resp.coords.latitude;
                this.longitud = resp.coords.longitude;
            }).catch((error) => {
                alert(error.message);
            });

        });

    }

    ngOnInit() { }



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
                "descripcion": this.descriptArea,
                "imagenes": this.images,
                "recogido": 0,
                "user_id": this.key.success.id_user,
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
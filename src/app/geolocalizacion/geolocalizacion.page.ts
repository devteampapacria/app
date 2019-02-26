import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
})
export class GeolocalizacionPage implements OnInit {
  id;
  latitud;
  longitud;
  descripcion;
  user;
  score;
  f_creacion;
  images : any;
  isLoading = false;

  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: true
  };

  constructor(private modalController: ModalController, private route: ActivatedRoute, public http: HttpClient) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getInfo();
  }

  openPreview(index, referer) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: index,
        referer: referer
      }
    }).then(modal => {
      modal.present();
    });
  }

  getInfo() {
    this.isLoading = true;
    this.http.get('https://papacria-dev-space-danielbueno.c9users.io/api/infoPunto/' + this.id).subscribe((response) => {
      let datos = Object(response);
      this.latitud = datos.latitud;
      this.longitud = datos.longitud;
      this.descripcion = datos.descripcion;
      this.user = datos.user_id;
      this.score = datos.score;
      this.f_creacion = datos.created_at;
      this.getImgs()
    })
  }

  getImgs() {
    this.http.get('https://papacria-dev-space-danielbueno.c9users.io/api/imgPunto/' + this.id).subscribe((response) => {
     this.images = response;
      for (let i = 0; i < this.images.length; i++) {
        this.images[i].loaded = false;
      }
    })
    this.isLoading = false;
  }
}
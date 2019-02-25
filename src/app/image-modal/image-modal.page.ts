import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {

  @ViewChild('slider', { read: ElementRef }) slider: ElementRef;
  img: any;
  referer: any;

  sliderOpts = {
    zoom: {
      maxRatio: 5
    }
  };

  constructor(private navParams: NavParams, private modalController: ModalController, public http: HttpClient) { }

  ngOnInit() {
    this.img = this.navParams.get('img');
    this.referer = this.navParams.get('referer');

    this.http.get('https://papacria-dev-space-danielbueno.c9users.io/api/fullImg/' + this.img + "/" + this.referer).subscribe((response) => {
      this.img = Object(response);
      this.img.loaded = false;
    })
  }

  zoom(zoomIn: boolean) {
    let zoom = this.slider.nativeElement.swiper.zoom;
    if (zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
  }

  close() {
    this.modalController.dismiss();
  }

}

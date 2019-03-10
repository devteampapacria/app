import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-geolocalizacion-creada',
    templateUrl: './geolocalizacion-creada.page.html',
    styleUrls: ['./geolocalizacion-creada.page.scss'],
})
export class GeolocalizacionCreadaPage implements OnInit {

    constructor(private router: Router, private platform: Platform) {
        this.platform.backButton.subscribe(() => {
            this.router.navigateByUrl('home');
        })
    }

    ngOnInit() {
    }

}

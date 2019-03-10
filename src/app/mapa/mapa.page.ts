import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.page.html',
    styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

    constructor(private router: Router, private platform: Platform) {
        this.platform.backButton.subscribe(() => {
            this.router.navigateByUrl('home');
        })
    }

    ngOnInit() {
    }

}

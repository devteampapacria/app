import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from "@ionic/angular";
@Component({
    selector: 'app-perfil-usuario',
    templateUrl: './perfil-usuario.page.html',
    styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

    constructor(private router: Router, private platform: Platform) {
        this.platform.backButton.subscribe(() => {
            this.router.navigateByUrl('home');
        })
    }

    ngOnInit() {
    }

}

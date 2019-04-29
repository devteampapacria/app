import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
    selector: 'app-ajustes-usuario',
    templateUrl: './ajustes-usuario.page.html',
    styleUrls: ['./ajustes-usuario.page.scss'],
})
export class AjustesUsuarioPage implements OnInit {

    constructor(private router: Router, private platform: Platform, private http: HttpClient, public toastController: ToastController) {
        this.platform.backButton.subscribe(() => {
            this.router.navigateByUrl('home/ajustes');
        })
    }
    ajustes = ["name", "email"];
    ngOnInit() {
    }
}

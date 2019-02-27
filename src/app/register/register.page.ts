import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
    template: `
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button defaultHref="home"></ion-back-button>
            </ion-buttons>
            <ion-title>Registrarme</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content padding>
        <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
            <ion-item>
                <ion-label></ion-label>
                <ion-input placeholder="Nombre" name="name" ngModel required #first="ngModel"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label></ion-label>
                <ion-input placeholder="Email" type="email" name="email" ngModel required></ion-input>
            </ion-item>
            <ion-item>
                <ion-label></ion-label>
                <ion-input placeholder="Contraseña" type="password" name="password" ngModel required #first="ngModel"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label></ion-label>
                <ion-input placeholder="Repite contraseña" type="password" name="password_confirmation" ngModel required></ion-input>
            </ion-item>
            <ion-button type="submit">
                registrarme
            </ion-button>
        </form>
        <br><br>
        <a href="/login">
            ¿Ya tienes cuenta?
        </a>
    </ion-content>
  `,
})
export class RegisterPage implements OnInit {

    constructor(private http: HttpClient, private router: Router, public toastController: ToastController) { }

    ngOnInit() {
    }

    onSubmit(f: NgForm) {
        console.log(f.value);  // { first: '', last: '' }
        console.log(f.valid);  // false

        this.http.post("https://papacria-dev-space-danielbueno.c9users.io/api/register", f.value, { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Accept": 'application/json', }) })
            .subscribe(data => {
                localStorage.setItem("key", JSON.stringify(data));
                this.router.navigateByUrl('/home');
            }, error => {

                this.presentToast(error);
            });

    }
    async presentToast(e) {
        var mensaje;
        switch (Object.keys(e.error.error)[0]) {
            case 'email':
                mensaje = e.error.error['email'][0];
                break;
            case 'name':
                mensaje = e.error.error['name'][0];
                break;
            case 'password':
                mensaje = e.error.error['password'][0];
                break;
            case 'password_confirmation':
                mensaje = e.error.error['password_confirmation'][0];
                break;
            default:

        }
        const toast = await this.toastController.create({
            message: mensaje,
            duration: 2000,
            showCloseButton: true,
            closeButtonText: 'X',
            color: "primary",
        });
        toast.present();
    }
}

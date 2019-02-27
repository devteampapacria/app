import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
    template: `
    <ion-header>
        <ion-toolbar>
            <ion-title>Registrarme</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content padding>
        <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
            <ion-item>
                <ion-label></ion-label>
                <ion-input placeholder="nombre" name="name" ngModel required #first="ngModel"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label></ion-label>
                <ion-input placeholder="email" type="email" name="email" ngModel required></ion-input>
            </ion-item>
            <ion-item>
                <ion-label></ion-label>
                <ion-input placeholder="contraseña" type="password" name="password" ngModel required #first="ngModel"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label></ion-label>
                <ion-input placeholder="repite contraseña" type="password" name="password_confirmation" ngModel required></ion-input>
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

    constructor(private http: HttpClient, private router: Router) { }

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
                console.log(error);

            });

    }
}

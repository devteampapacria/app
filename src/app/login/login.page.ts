import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    template: `
    <ion-header>
        <ion-toolbar>
            <ion-title>login</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content padding>
        <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
            <ion-item>
                <ion-label></ion-label>
                <ion-input placeholder="Email" type="email" name="email" ngModel required></ion-input>
            </ion-item>
                <ion-item>
                <ion-label></ion-label>
                <ion-input placeholder="Contraseña" type="password" name="password" ngModel required #first="ngModel"></ion-input><br>
            </ion-item>
            <ion-button type="submit">
                Logeame
            </ion-button>
        </form>
        <br><br>
        <a href="/register">
            ¿No tienes cuenta?
        </a>
    </ion-content>
  `,
})
export class LoginPage implements OnInit {

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {
    }

    onSubmit(f: NgForm) {
        console.log(f.value);  // { first: '', last: '' }
        console.log(f.valid);  // false

        this.http.post("https://papacria-dev-space-danielbueno.c9users.io/api/login", f.value, { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Accept": 'application/json', }) })
            .subscribe(data => {
                localStorage.setItem("key", JSON.stringify(data));
                this.router.navigateByUrl('/home');
            }, error => {
                console.log(error);

            });
    }
}

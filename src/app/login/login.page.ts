import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(private http: HttpClient, private network: Network, private router: Router, public toastController: ToastController, private platform: Platform) {
        // watch network for a disconnection
        this.network.onDisconnect().subscribe(() => {
            this.router.navigateByUrl('/network-error');
        });

        this.platform.backButton.subscribe(() => {
            this.router.navigateByUrl('home');
        })
    }

    ngOnInit() {
    }

    onSubmit(f: NgForm) {

        this.http.post("https://papacria-dev-space-danielbueno.c9users.io/api/login", f.value, { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Accept": 'application/json', }) })
            .subscribe(data => {
                localStorage.setItem("key", JSON.stringify(data['success']));
                this.router.navigateByUrl('/home');
            }, error => {
                this.presentToast()
            });
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Tu correo o contraseña es incorrecto',
            duration: 2000,
            showCloseButton: true,
            closeButtonText: 'X',
            color: "primary",
        });
        toast.present();
    }

    takeMeToRegister() {
        this.router.navigateByUrl('/register');
    }
}

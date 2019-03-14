import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { ToastController } from '@ionic/angular';
import { Platform } from "@ionic/angular";

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
    grecaptcha;
    constructor(private network: Network, private http: HttpClient, private router: Router, public toastController: ToastController, private platform: Platform) {
        this.platform.backButton.subscribe(() => {
            this.router.navigateByUrl('home');
        })
        // watch network for a disconnection
        this.network.onDisconnect().subscribe(() => {
            this.router.navigateByUrl('/network-error');
        });
    }

    ngOnInit() {
    }
    form;
    onSubmit(f: NgForm) {
        this.form = f;
        this.http.post("https://papacria-dev-space-danielbueno.c9users.io/api/register", f.value, { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Accept": 'application/json', }) })
            .subscribe(data => {
                localStorage.setItem("key", JSON.stringify(data));
                this.router.navigateByUrl('/home');
            }, error => {

                this.presentToast(error);
            });
    }
    async presentToast(e) {
        console.log(e);
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
            case 'g_recaptcha_response':
                this.form.resetForm();
                mensaje = e.error.error['g_recaptcha_response'][0];
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

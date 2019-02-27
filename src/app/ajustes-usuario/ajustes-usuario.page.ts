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
    onSubmit(f: NgForm) {
        console.log(f.value);  // { first: '', last: '' }
        console.log(f.valid);  // false

        // this.http.post("https://papacria-dev-space-danielbueno.c9users.io/api/register", f.value, { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Accept": 'application/json', }) })
        //     .subscribe(data => {
        //         localStorage.setItem("key", JSON.stringify(data));

        //     }, error => {

        //         this.presentToast();
        //     });

    }
    async presentToast() {
        const toast = await this.toastController.create({
            message: "mensaje",
            duration: 2000,
            showCloseButton: true,
            closeButtonText: 'X',
            color: "primary",
        });
        toast.present();
    }
}
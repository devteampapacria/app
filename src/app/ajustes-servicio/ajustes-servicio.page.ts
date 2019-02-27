import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
    selector: 'app-ajustes-servicio',
    templateUrl: './ajustes-servicio.page.html',
    styleUrls: ['./ajustes-servicio.page.scss'],
})
export class AjustesServicioPage implements OnInit {

    constructor(private route: ActivatedRoute, private http: HttpClient, public toastController: ToastController, private router: Router, private platform: Platform) {


        this.platform.backButton.subscribe(() => {
            this.router.navigateByUrl('home');
        })
    }
    servicio;

    ngOnInit() {
        this.servicio = this.route.snapshot.paramMap.get('servicio');
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

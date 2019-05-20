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
    key;

    ngOnInit() {
        this.servicio = this.route.snapshot.paramMap.get('servicio');
    }
    onSubmit(f: NgForm) {
        console.log(f.value);  // { first: '', last: '' }
        console.log(f.valid);  // false
        try {
            this.key = JSON.parse(localStorage.getItem("key"));
            console.log(this.key.id_user);
            f.value["id"] = this.key.id_user;
            f.value["token"] = this.key.token;
        } catch (e) {
            this.router.navigateByUrl('/login');
        }

        this.http.post("https://papacria.org/api/" + this.servicio, f.value, { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Accept": 'application/json', }) })
            .subscribe(data => {
                this.presentToast("Tu " + this.servicio + " ha sido modificado correctamente");

            }, error => {

                this.presentToast("Encontramos un error en tu petición");
            });

    }
    async presentToast(mensaje) {
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

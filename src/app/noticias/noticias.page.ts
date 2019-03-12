import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

@Component({
    selector: 'app-noticias',
    templateUrl: './noticias.page.html',
    styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    //aqui almacenamos todas las noticias que se van a ver
    private noticias = new Array;
    //aqui todas las noticias
    private todas;
    //indice de noticias que llevamos
    i = 1;

    constructor(private network: Network, private router: Router, private http: HttpClient, private platform: Platform) {
        // watch network for a disconnection
        this.network.onDisconnect().subscribe(() => {
            this.router.navigateByUrl('/network-error');
        });

        this.doRefresh(event);
        this.platform.backButton.subscribe(() => {
            this.router.navigateByUrl('home');
        })
    }
    //cuando se llame al evento de loadData
    loadData(event) {
        setTimeout(() => {
            this.http.get('https://papacria-dev-space-danielbueno.c9users.io/api/noticias?page=' + this.i).subscribe((response) => {
                this.todas = response;
                if (this.todas.data == []) {
                    event.target.complete();
                    return;
                }

                //por defecto ponemos el limite de noticias
                this.todas.data.forEach(element => {
                    this.noticias.push(element);
                });
                this.i++;
                event.target.complete();

            })
        }, 100);
    }
    doRefresh(event) {
        setTimeout(() => {
            this.noticias = new Array;
            this.i = 1;
            this.http.get('https://papacria-dev-space-danielbueno.c9users.io/api/noticias?page=' + this.i).subscribe((response) => {
                this.todas = response;
                //por defecto ponemos el limite de noticias
                this.todas.data.forEach(element => {
                    this.noticias.push(element);
                });
                this.i++;
                event.target.complete();
            });
        }, 100);
    }
}

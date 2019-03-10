import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-noticias',
    templateUrl: './noticias.page.html',
    styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    //aqui almacenamos todas las noticias que se van a ver
    private noticias = new Array;
    //aqui todas las noticias
    private todas;
    //indice de noticias que llevamos
    i = 1;
    constructor(private http: HttpClient, private router: Router, private platform: Platform) {
        this.doRefresh(event);
        this.platform.backButton.subscribe(() => {
            this.router.navigateByUrl('home');
        })
    }
    //cuando se llame al evento de loaddata
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
    ngOnInit() {
    }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

@Component({
    selector: 'app-clasificacion',
    templateUrl: './clasificacion.page.html',
    styleUrls: ['./clasificacion.page.scss'],
})
export class ClasificacionPage {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    key;
    userData;
    noData;
    private allRankings;

    private rankings = new Array;
    private todas;
    i = 1;

    constructor(public router: Router, public http: HttpClient, private network: Network) {
        //control de logeo
        try {
            this.key = JSON.parse(localStorage.getItem("key"));
        } catch (e) {
            this.router.navigateByUrl('/login');
        }
        // watch network for a disconnection
        this.network.onDisconnect().subscribe(() => {
            this.router.navigateByUrl('/network-error');
        });
        //fin control de logeo
        this.doRefresh(event);
        this.getRankings();
    }

    getRankings() {
        this.http.get('https://papacria-dev-space-danielbueno.c9users.io/api/allRankings').subscribe((response) => {
            this.allRankings = response;

            let index = this.allRankings.findIndex(x => x.id == this.key.id_user);
            if (index != -1) {
                this.userData = this.allRankings[index];
                console.log(this.userData.position);
            } else {
                this.noData = "No tienes todavía ninguna geolocalización verificada";
            }
        })
    }


    //cuando se llame al evento de loadData
    loadData(event) {
        setTimeout(() => {
            this.http.get('https://papacria-dev-space-danielbueno.c9users.io/api/rankings?page=' + this.i).subscribe((response) => {
                this.todas = response;
                if (this.todas.data == []) {
                    event.target.complete();
                    return;
                }

                //por defecto ponemos el limite de noticias
                this.todas.data.forEach(element => {
                    this.rankings.push(element);
                });
                this.i++;
                event.target.complete();

            })
        }, 100);
    }
    doRefresh(event) {
        setTimeout(() => {
            this.rankings = new Array;
            this.i = 1;
            this.http.get('https://papacria-dev-space-danielbueno.c9users.io/api/rankings?page=' + this.i).subscribe((response) => {
                this.todas = response;
                //por defecto ponemos el limite de noticias
                this.todas.data.forEach(element => {
                    this.rankings.push(element);
                });
                this.i++;
                event.target.complete();
            });
        }, 100);
    }
}

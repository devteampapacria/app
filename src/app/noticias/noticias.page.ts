import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';
import { ViewChild } from '@angular/core';
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
    //el numero de noticias que quiero mostrar
    limite = 3;
    //indice de noticias que llevamos
    i = 0;

    constructor(private http: HttpClient) {
        this.doRefresh(event);
    }
    //cuando se llame al evento de loaddata
    loadData(event) {
        setTimeout(() => {
            //incrementamos el limite en 3
            this.limite = this.limite + 3;
            //y recorremos hasta encontrar el limite
            for (this.i; this.i < this.limite; this.i++) {
                //en caso de que ya no queden pues sencillamente desactivo el evento y paro el bucle
                if (this.todas[this.i] == undefined) {
                    event.target.complete();
                    break;
                }
                this.noticias.push(this.todas[this.i]);
            }
        }, 1000);
    }
    doRefresh(event) {
        setTimeout(() => {
            this.noticias = new Array;
            this.i = 0;
            this.limite = 3;
            this.http.get('https://papacria-dev-space-danielbueno.c9users.io/api/noticias').subscribe((response) => {
                this.todas = response;
                //por defecto ponemos el limite de noticias
                for (this.i; this.i < this.limite; this.i++) {
                    this.noticias.push(this.todas[this.i]);
                }
                event.target.complete();

            })
        }, 1000);


    }

    ngOnInit() {
    }

}

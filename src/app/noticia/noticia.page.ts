import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

@Component({
    selector: 'app-noticia',
    templateUrl: './noticia.page.html',
    styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage {
    private id;
    private noticia;
    private contenido: string = "";
        
    constructor(private network: Network, private router: Router, private route: ActivatedRoute, private http: HttpClient, private platform: Platform) {
        this.platform.backButton.subscribe(() => {
            this.router.navigateByUrl('home/noticias');
        })

        // watch network for a disconnection
        this.network.onDisconnect().subscribe(() => {
            this.router.navigateByUrl('/network-error');
        });

        this.id = this.route.snapshot.paramMap.get('noticia_id');
        this.http.get('https://papacria-dev-space-danielbueno.c9users.io/api/noticia/' + this.id).subscribe((response) => {
            this.noticia = response;
            this.contenido = this.noticia.contenido;
        })
    }
}

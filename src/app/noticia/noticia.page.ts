import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
@Component({
    selector: 'app-noticia',
    templateUrl: './noticia.page.html',
    styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {
    private id;
    private noticia;
    private contenido: string = "";
    constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private platform: Platform) {
        this.platform.backButton.subscribe(() => {
            this.router.navigateByUrl('home/noticias');
        })
        this.id = this.route.snapshot.paramMap.get('noticia_id');
        this.http.get('https://papacria-dev-space-danielbueno.c9users.io/api/noticia/' + this.id).subscribe((response) => {
            this.noticia = response;
            this.contenido = this.noticia.contenido;
        })
    }

    ngOnInit() {
    }

}

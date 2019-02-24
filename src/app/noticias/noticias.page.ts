import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  noticias;
  constructor(private http: HttpClient) {
    this.http.get('https://papacria-dev-space-danielbueno.c9users.io/api/noticias').subscribe((response) => {
      console.log(response);
      this.noticias = response;
    })
   }

  ngOnInit() {
  }

}

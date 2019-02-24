import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router, private iab: InAppBrowser) {

    /* if (localStorage.getItem['firstTimeLoad'] != 'TRUE') {
      localStorage.setItem('firstTimeLoad', 'TRUE');
      this.router.navigateByUrl('/mapa-app');
    } */

  }
  /* isLoading = false;

  openWebpage(url: string) {
    this.isLoading = true;
    const browser = this.iab.create(url, '_self');
  } */
}

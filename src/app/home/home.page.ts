import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private iab: InAppBrowser) {}
  isLoading = false;

  openWebpage(url: string) {
    this.isLoading = true;
    // Opening a URL and returning an InAppBrowserObject
    const browser = this.iab.create(url, '_self');
   // Inject scripts, css and more with browser.X
  }
}

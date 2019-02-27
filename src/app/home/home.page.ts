import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    key;
    constructor(private router: Router) {
        let confirmation = localStorage.getItem('firstTimeConfirmation');
        if (localStorage.getItem('firstTimeConfirmation') != null) {
          if (JSON.parse(confirmation) == true) {
            this.router.navigateByUrl('/home');
          }
        } else {
          this.router.navigateByUrl('/first-time-slide');
        }

        if (localStorage.getItem('key')) {
            this.key = JSON.parse(localStorage.getItem('key')).success;
        }
    }
}

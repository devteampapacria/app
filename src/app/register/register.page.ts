import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
    template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
      <input name="name" ngModel required #first="ngModel">
      <input type="email" name="email" ngModel required>
      <input type="password" name="password" ngModel required #first="ngModel">
      <input type="password" name="password_confirmation" ngModel required>
      <button>Submit</button>
    </form>
  `,
})
export class RegisterPage implements OnInit {

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {
    }

    onSubmit(f: NgForm) {
        console.log(f.value);  // { first: '', last: '' }
        console.log(f.valid);  // false

        this.http.post("https://papacria-dev-space-danielbueno.c9users.io/api/register", f.value, { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Accept": 'application/json', }) })
            .subscribe(data => {
                console.log(data);
                // this.router.navigateByUrl('/home');
            }, error => {
                console.log(error);

            });

    }
}

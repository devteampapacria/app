import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
    template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
      <input name="name" ngModel required #first="ngModel">
      <input name="email" ngModel required>
      <input name="password" ngModel required #first="ngModel">
      <input name="password_confirmation" ngModel required>
      <button>Submit</button>
    </form>
  `,
})
export class RegisterPage implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    onSubmit(f: NgForm) {
        console.log(f.value);  // { first: '', last: '' }
        console.log(f.valid);  // false
    }
}

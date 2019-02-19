import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { NoticiasPage } from './noticias.page';

const routes: Routes = [
  {
    path: '',
    component: NoticiasPage
  }
];

@Component({
  selector: 'infinite-scroll-example',
  templateUrl: 'noticias.page.html',
  styleUrls: ['./noticias.page.scss']
})
export class InfiniteScrollExample {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor() {}

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NoticiasPage]
})
export class NoticiasPageModule {}

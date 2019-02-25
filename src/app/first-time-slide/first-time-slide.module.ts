import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FirstTimeSlidePage } from './first-time-slide.page';

const routes: Routes = [
  {
    path: '',
    component: FirstTimeSlidePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FirstTimeSlidePage]
})
export class FirstTimeSlidePageModule {}

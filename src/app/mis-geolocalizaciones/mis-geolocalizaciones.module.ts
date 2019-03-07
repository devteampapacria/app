import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MisGeolocalizacionesPage } from './mis-geolocalizaciones.page';

const routes: Routes = [
  {
    path: '',
    component: MisGeolocalizacionesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MisGeolocalizacionesPage]
})
export class MisGeolocalizacionesPageModule {}

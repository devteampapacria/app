import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GeolocalizacionCreadaPage } from './geolocalizacion-creada.page';

const routes: Routes = [
  {
    path: '',
    component: GeolocalizacionCreadaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GeolocalizacionCreadaPage]
})
export class GeolocalizacionCreadaPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CrearGeolocalizacionPage } from './crear-geolocalizacion.page';

const routes: Routes = [
  {
    path: '',
    component: CrearGeolocalizacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CrearGeolocalizacionPage]
})
export class CrearGeolocalizacionPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { IonicModule } from '@ionic/angular';

import { CrearGeolocalizacionPage } from './crear-geolocalizacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CrearGeolocalizacionPage
      }
    ])
  ],
  declarations: [CrearGeolocalizacionPage]
})
export class CrearGeolocalizacionPageModule {


}

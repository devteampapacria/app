import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AjustesServicioPage } from './ajustes-servicio.page';

const routes: Routes = [
  {
    path: '',
    component: AjustesServicioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AjustesServicioPage]
})
export class AjustesServicioPageModule {}

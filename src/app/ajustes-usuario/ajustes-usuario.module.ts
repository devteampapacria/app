import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AjustesUsuarioPage } from './ajustes-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: AjustesUsuarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AjustesUsuarioPage]
})
export class AjustesUsuarioPageModule {}

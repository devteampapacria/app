import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';

console.log("llego");
const routes: Routes = [
    {
      path: 'tabs',
      component: HomePage,
      children: [
        {
            path: 'one',
            outlet: 'one',
            loadChildren: '../crear-geolocalizacion/crear-geolocalizacion.module#CrearGeolocalizacionPageModule'
        },
        {
            path: 'two',
            outlet: 'two',
            loadChildren: '../crear-geolocalizacion/crear-geolocalizacion.module#CrearGeolocalizacionPageModule'
        },
        {
            path: 'three',
            outlet: 'three',
            loadChildren: '../crear-geolocalizacion/crear-geolocalizacion.module#CrearGeolocalizacionPageModule'
        }
      ]
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HomePageRoutingModule {}
  
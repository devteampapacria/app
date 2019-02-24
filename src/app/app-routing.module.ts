import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'home/crear',
    loadChildren: './crear-geolocalizacion/crear-geolocalizacion.module#CrearGeolocalizacionPageModule'
  },
  {
    path: 'home/mapa',
    loadChildren: './mapa-app/mapa-app.module#MapaAppPageModule'
  },
  {
    path: 'home/noticias',
    loadChildren: './noticias/noticias.module#NoticiasPageModule'
  },
  {
    path: 'geolocalizacion-creada',
    loadChildren: './geolocalizacion-creada/geolocalizacion-creada.module#GeolocalizacionCreadaPageModule'
  },
  {
    path: 'first-time-slide',
    loadChildren: './first-time-slide/first-time-slide.module#FirstTimeSlidePageModule'
  },
  {
    path: 'mapa-app',
    loadChildren: './mapa-app/mapa-app.module#MapaAppPageModule'
  },
  {
    path: 'geolocalizacion/:id',
    loadChildren: './geolocalizacion/geolocalizacion.module#GeolocalizacionPageModule'
  },
  {
    path: 'image-modal',
    loadChildren: './image-modal/image-modal.module#ImageModalPageModule'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
  { path: 'home/crear',
    loadChildren: './crear-geolocalizacion/crear-geolocalizacion.module#CrearGeolocalizacionPageModule' 
  },
  { path: 'home/mapa',
    loadChildren: './mapa/mapa.module#MapaPageModule' 
  },
  { path: 'home/noticias',
    loadChildren: './noticias/noticias.module#NoticiasPageModule' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

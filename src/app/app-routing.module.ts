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
  { path: 'home/noticia/:noticia_id', loadChildren: './noticia/noticia.module#NoticiaPageModule' },  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

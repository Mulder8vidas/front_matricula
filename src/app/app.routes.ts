import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:"", loadChildren:() => import('./inicio/inicio/inicio.module').then((a)=>a.InicioModule)
  }
];


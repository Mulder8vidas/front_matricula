import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./paginas/login/login.component";
import {RegistroAlumnoComponent} from "./paginas/registro-alumno/registro-alumno.component";
import {AulasListComponent} from "./paginas/aulas-list/aulas-list.component";
import {MainComponent} from "./paginas/main/main.component";
import {ListUsersComponent} from "./paginas/list-users/list-users.component";


const routes: Routes = [{
  path: '', component: LoginComponent},
  {path: 'registro', component: RegistroAlumnoComponent},
  {path: 'aulas', component: AulasListComponent},
  {path:'home',component:MainComponent},
  {path:'list:/id',component:ListUsersComponent}]



@NgModule({
  imports: [RouterModule.forChild(routes)], exports: [RouterModule]
})
export class InicioRoutingModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {EtudiantComponent} from './etudiant/etudiant.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'etudiants', component: EtudiantComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InicioComponent } from './pages/dashboard/inicio/inicio.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'home', component: HomeComponent }
];

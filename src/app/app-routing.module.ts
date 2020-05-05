import { HomeComponent } from './components/home/home.component';
import { SuscribeComponent } from './components/suscribe/suscribe.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'suscribe',
    component: SuscribeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

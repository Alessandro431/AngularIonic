import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPage } from './landing.page';
import { LoginPage } from '../auth/login/login.page';
import { RegisterPage } from '../auth/register/register.page';

const routes: Routes = [
  {
    path: '',
    component: LandingPage
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'register',
    component: RegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule {}

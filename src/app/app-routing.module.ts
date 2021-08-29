import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path        : '',
    component   : HomeComponent,
    loadChildren: () => import('./layouts/layout.module').then(m => m.LayoutModule),
  },
  {
    path     : 'login',
    component: LoginComponent,
  },
  {
    path     : '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

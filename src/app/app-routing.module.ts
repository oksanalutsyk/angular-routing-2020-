import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { AuthGuard } from './components/user/auth-guard.service';
// import { AuthGuard } from './components/products/products.module';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, children:[
    {
      path: '',
      loadChildren: './components/home/home.module#HomeModule',
    },
  ] },

  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   children: [
  //     { path: '', redirectTo: 'home', pathMatch: 'full' },
  //     { path: 'news', component: NewsComponent },
  //     { path: 'about', component: AboutComponent },
  //   ],
  // },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  //lazy loading
  {
    path: 'products',
    //guard
    canActivate:[AuthGuard],
    loadChildren: './components/products/products.module#ProductsModule',
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

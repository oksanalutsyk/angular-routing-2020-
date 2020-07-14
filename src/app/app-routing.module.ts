import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { AuthGuard } from './components/user/auth-guard.service';
// import { AuthGuard } from './components/products/products.module';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      //lazy loading
      {
        path: '',
        // loadChildren: './components/home/home.module#HomeModule',
        loadChildren: () =>
          import('./components/home/home.module').then((mod) => mod.HomeModule),
      },
    ],
  },
  //lazy loading
  {
    path: 'products',
    //guard
    canActivate: [AuthGuard],
    // loadChildren: './components/products/products.module#ProductsModule',
    loadChildren: () =>
      import('./components/products/products.module').then(
        (mod) => mod.ProductsModule
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//components
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
//guards
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        // loadChildren: './components/home/home.module#HomeModule',
        loadChildren: () =>
          import('./shared/modules/home.module').then((mod) => mod.HomeModule),
      },
    ],
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    // loadChildren: './components/products/products.module#ProductsModule',
    loadChildren: () =>
      import('./shared/modules/products.module').then(
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

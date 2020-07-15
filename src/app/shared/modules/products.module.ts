import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { ProductsComponent } from '../../components/products/product-list/products.component';
import { ProductDetailComponent } from '../../components/products/product-detail/product-detail.component';
import { ProductEditComponent } from '../../components/products/product-edit/product-edit.component';

import { ProductResolverService } from '../resolvers/product.service';
import { ProductService } from '../services/product.service';

// import { AuthGuard } from '../user/auth-guard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductEditGuard } from '../guards/product.guard';


@NgModule({
  imports: [
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      // {
      //   path: 'products',
      //   canActivate:[AuthGuard],
      //   children: [
          { path: '', component: ProductsComponent },

          {
            path: ':id',
            component: ProductDetailComponent,
            resolve: { product: ProductResolverService },
          },
          {
            path: ':id/edit',
            component: ProductEditComponent,
            resolve: { product: ProductResolverService },
            canDeactivate:[ProductEditGuard],

          },
      //   ],
      // },
    ]),
  ],
  declarations: [ProductsComponent, ProductEditComponent],
  providers: [ProductService, ProductResolverService, ProductEditGuard],
})
export class ProductsModule {}

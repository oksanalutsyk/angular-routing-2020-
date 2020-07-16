import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
//components
import { ProductsComponent } from '../../components/products/product-list/products.component';
import { ProductDetailComponent } from '../../components/products/product-detail/product-detail.component';
import { ProductEditComponent } from '../../components/products/product-edit/product-edit.component';
import { ProductAddComponent } from 'src/app/components/products/product-add/product-add.component';
//resolvers
import { ProductResolver } from '../resolvers/product.resolver';
//services
import { ProductService } from '../services/product.service';
//guards
import { ProductEditGuard } from '../guards/product-edit.guard';
import { ProductAddGuard } from '../guards/product-add.guard';


@NgModule({
  imports: [
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ProductsComponent },

      {
        path: ':id',
        component: ProductDetailComponent,
        resolve: { product: ProductResolver },
      },
      {
        path: ':id/edit',
        component: ProductEditComponent,
        resolve: { product: ProductResolver },
        canDeactivate: [ProductEditGuard],
      },
      {
        path: ':id/add',
        component: ProductAddComponent,
        canDeactivate: [ProductAddGuard],
      },
    ]),
  ],
  declarations: [ProductsComponent, ProductEditComponent, ProductAddComponent],
  providers: [
    ProductService,
    ProductResolver,
    ProductEditGuard,
    ProductAddGuard,
  ],
})
export class ProductsModule {}

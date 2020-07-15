import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { ProductInterface } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<ProductInterface> {
  constructor(private productServise: ProductService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductInterface> {
    let id = route.params['id'];
    return this.productServise.getProduct(+id).pipe(
      map((product) => {
        if (product) {
          return product;
        }
        console.log(`Product was not found:${id}`);
        this.router.navigate(['/products']);
        return null;
      }),
      catchError((error) => {
        console.log(error);
        this.router.navigate(['/products']);
        return of(null);
      })
    );
  }
}

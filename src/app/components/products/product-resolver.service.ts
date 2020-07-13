import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IProduct } from './product.interface';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { ProductService } from './producr.service';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class ProductResolverService implements Resolve<IProduct> {
  constructor(private productServise: ProductService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IProduct> {
    let id = route.params['id'];
    if (isNaN(id)) {
      console.log(`Product id was not a number: ${id}`);
      this.router.navigate(['/products']);
      return of(null);
    }
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
        // console.log(`Retrieval error: ${error}`);
        console.log(error);
        this.router.navigate(['/products']);
        return of(null);
      })
    );
  }
}

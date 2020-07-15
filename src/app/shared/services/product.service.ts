import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ProductInterface } from '../interfaces/product.interface';

@Injectable()
export class ProductService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/products';
  }

  public getProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.url).pipe(delay(1000));
  }
  public getProduct(id: number): Observable<ProductInterface> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    return this.http.get<ProductInterface>(`${this.url}/${id}`);
  }
  public editProduct(product: ProductInterface): Observable<ProductInterface[]> {
    return this.http.put<ProductInterface[]>(`${this.url}/${product.id}`, product);
  }

  public addProduct(product: ProductInterface): Observable<ProductInterface[]> {
    return this.http.post<ProductInterface[]>(this.url, product);
  }
  public delProduct(id: number): Observable<ProductInterface[]> {
    return this.http.delete<ProductInterface[]>(`${this.url}/${id}`);
  }

  initializeProduct(): ProductInterface {
    // Return an initialized object
    return {
      id: 0,
      title: null,
      body: null,
    };
  }
}

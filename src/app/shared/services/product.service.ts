import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { IProduct } from '../interfaces/product.interface';

@Injectable()
export class ProductService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/products';
  }

  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url).pipe(delay(1000));
  }
  public getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }
  public editProduct(product: IProduct): Observable<IProduct[]> {
    return this.http.put<IProduct[]>(`${this.url}/${product.id}`, product);
  }

  public addProduct(product: IProduct): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(this.url, product);
  }
  public delProduct(id: number): Observable<IProduct[]> {
    return this.http.delete<IProduct[]>(`${this.url}/${id}`);
  }

  initializeProduct(): IProduct {
    // Return an initialized object
    return {
      id: 0,
      title: null,
      body: null,
    };
  }
}

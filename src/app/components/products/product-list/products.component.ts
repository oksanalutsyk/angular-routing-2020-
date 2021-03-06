import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductService } from '../../../shared/services/product.service';
import { ProductInterface } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  products: ProductInterface[] = [];
  displayedColumns: string[] = ['position', 'name', 'text', 'edit'];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  //get all products
  public getProducts(): void {
    this.subscription = this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}

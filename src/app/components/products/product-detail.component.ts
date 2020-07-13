import { Component, OnInit } from '@angular/core';
import { ProductService } from './producr.service';

import { IProduct } from './product.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;
  errorMessage: string;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //   Without resolver (we need getProduct method)
    // -----------------------------------
    //snapShot or ...
    // let id = +this.route.snapshot.params['id'];
    //   this.getProduct(id)
    // ...observable
    // this.route.params.subscribe((params) => {
    //   let id = +params['id'];
    //   this.getProduct(id);
    // });
    // -----------------------------------

    // With resolver
    // this.product = this.route.snapshot.data['product']

    this.route.data.subscribe((data) => {
      this.product = data['product'];
    });
  }
  // -----------------------------------
  //get product
  //   public getProduct(id: number): void {
  //     this.productService.getProduct(id).subscribe(
  //       (data) => (this.product = data),
  //       (error) => (this.errorMessage = error)
  //     );
  //   }
  // ----------------------------------------------
}

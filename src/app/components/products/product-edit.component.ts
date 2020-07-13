import { Component, OnInit } from '@angular/core';
import { IProduct } from './product.interface';
import { ProductService } from './producr.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-edit',
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit {
  pageTitle: string = 'Product Edit';
  product: IProduct;
  editForm: FormGroup;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  
  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', [Validators.required]],
    });

    this.route.params.subscribe((params) => {
      let id = +params['id'];
      this.getProduct(id);
    });
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe(
      (product: IProduct) => this.onProductRetrieved(product),
      (error: any) => console.error(error)
    );
  }

  onProductRetrieved(product: IProduct): void {
    this.product = product;
    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.title}`;
    }
  }
  onSubmit() {
    console.log(this.editForm.value);
  }
  showMessage(): boolean {
    return this.editForm.dirty;
  }
}

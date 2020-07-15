import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductInterface } from '../../../shared/interfaces/product.interface';
import { ProductService } from '../../../shared/services/product.service';
import { NewProduct } from 'src/app/shared/classes/product.class';

@Component({
  selector: 'app-products-add',
  templateUrl: './product-add.component.html',
})
export class ProductAddComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product Add';

  addForm: FormGroup;
  productTitle = '';
  productText = '';

  products: Array<ProductInterface> = [];
  product: ProductInterface;
  newProduct: ProductInterface;
  subscription: Subscription;
  addStatus = false;

  constructor(
    private fb: FormBuilder,
    public productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      title: [this.productTitle, Validators.required],
      body: [this.productText, [Validators.required]],
    });
  }

  addNewProduct() {
    const newProduct: ProductInterface = new NewProduct(
      0,
      this.productTitle,
      this.productText
    );
    if (this.products.length >= 1) {
      newProduct.id = this.products.slice(-1)[0].id + 1;
      this.subscription = this.productService
        .addProduct(newProduct)
        .subscribe();
    } else {
      this.newProduct = {
        id: 0,
        title: this.productTitle,
        body: this.productText,
      };
      this.subscription = this.productService
        .addProduct(newProduct)
        .subscribe();
    }
  }

  save() {
    this.addStatus = true;
  }
  cancel() {
    this.addStatus = false;
  }

  showMessage(): boolean {
    return this.addForm.dirty;
  }
  onSubmit() {
    console.log(this.addForm.value);
    this.productTitle = this.addForm.value.title;
    this.productText = this.addForm.value.body;
    this.addNewProduct();
    this.router.navigate(['/products']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}

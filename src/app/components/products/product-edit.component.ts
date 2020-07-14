import { Component, OnInit } from '@angular/core';
import { IProduct, NewProduct } from './product.interface';
import { ProductService } from './producr.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-edit',
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit {
  pageTitle: string = 'Product Edit';
  product: IProduct;
  editForm: FormGroup;

  productTitle = '';
  productText = '';

  editId:number;
  editProductTitle='';
  editProductText='';
  editStatus = false;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = +params['id'];
      this.editId = id;
      this.getProduct(id);
    });
    this.route.data.subscribe((data) => {
      this.productTitle = data.product.title;
      this.productText = data.product.body;
    });

    this.editForm = this.fb.group({
      title: [this.productTitle, Validators.required],
      body: [this.productText, [Validators.required]],
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
  saveEditChanges() {
    const newProduct: IProduct = new NewProduct(
      this.editId,
      this.editProductTitle,
      this.editProductText
    );
    console.log(newProduct);
    this.productService.editProduct(newProduct).subscribe();
  }
  onSubmit() {
    console.log(this.editForm.value);
    this.editProductTitle = this.editForm.value.title;
    this.editProductText = this.editForm.value.body;
    this.saveEditChanges();
    this.editStatus = true;
    this.router.navigate(['/products']);
  }
  showMessage(): boolean {
    return this.editForm.dirty;
  }
}

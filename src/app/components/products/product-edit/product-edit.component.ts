import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../../shared/interfaces/product.interface';
import { ProductService } from '../../../shared/services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewProduct } from 'src/app/shared/classes/product.class';

@Component({
  selector: 'app-products-edit',
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit {
  pageTitle: string = 'Product Edit';
  products: Array<ProductInterface> = [];
  product: ProductInterface;
  newProduct: ProductInterface;
  editForm: FormGroup;

  productTitle = '';
  productText = '';

  editId: number;
  editProductTitle = '';
  editProductText = '';
  editStatus = false;

  subscription: Subscription;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    //get product
    this.route.data.subscribe((data) => {
      console.log(data)
      this.product = data['product'];
      this.editId = this.product.id;
      this.productTitle = this.product.title;
      this.productText = this.product.body;
    });
  
    this.editForm = this.fb.group({
      title: [this.productTitle, Validators.required],
      body: [this.productText, [Validators.required]],
    });
  }

  getProducts(): void {
    this.subscription = this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (err) => {
        console.error(err);
      }
    );
  }
  onProductRetrieved(product: ProductInterface): void {
    this.product = product;
    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.title}`;
    }
  }
  saveEditChanges() {
    const newProduct: ProductInterface = new NewProduct(
      this.editId,
      this.editProductTitle,
      this.editProductText
    );
    console.log(newProduct);
    this.productService.editProduct(newProduct).subscribe();
  }
  addNewProduct() {
    const newProduct: ProductInterface = new NewProduct(
      0,
      this.editProductTitle,
      this.editProductText
    );
    if (this.products.length >= 1) {
      newProduct.id = this.products.slice(-1)[0].id + 1;
      this.subscription = this.productService
        .addProduct(newProduct)
        .subscribe();
    } else {
      this.newProduct = {
        id: 0,
        title: this.editProductTitle,
        body: this.editProductText,
      };
      this.subscription = this.productService
        .addProduct(newProduct)
        .subscribe();
    }
  }
  updateProducts() {
    if (this.editId !== 0 ) {
      this.saveEditChanges();
    } else {
      this.addNewProduct();
    }
  }
  onSubmit() {
    console.log(this.editForm.value);
    this.editProductTitle = this.editForm.value.title;
    this.editProductText = this.editForm.value.body;
    this.updateProducts();
    this.router.navigate(['/products']);
  }
  save() {
    this.editStatus = true;
  }
  cancel() {
    this.editStatus = false;
  }

  deleteProduct(item: ProductInterface): void {
    const id = item.id;
    this.subscription = this.productService.delProduct(id).subscribe(() => {

      console.log(`Post id ${id} deleted`);
    });
  }
  showMessage(): boolean {
    return this.editForm.dirty;
  }
}

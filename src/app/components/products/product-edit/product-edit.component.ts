import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductInterface } from '../../../shared/interfaces/product.interface';
import { ProductService } from '../../../shared/services/product.service';
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
  productId: number;
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
      console.log(data);
      this.product = data['product'];
      this.productId = this.product.id;
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
  saveEditChanges() {
    const newProduct: ProductInterface = new NewProduct(
      this.productId,
      this.productTitle,
      this.productText
    );
    this.productService.editProduct(newProduct).subscribe();
  }

  onSubmit() {
    console.log(this.editForm.value);
    this.productTitle = this.editForm.value.title;
    this.productText = this.editForm.value.body;
    this.saveEditChanges();
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

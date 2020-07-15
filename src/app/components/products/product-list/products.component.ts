import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  private subscription: Subscription;

  products:IProduct[]=[]
  displayedColumns: string[] = ['position', 'name', 'text', 'edit'];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts()
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
  
}

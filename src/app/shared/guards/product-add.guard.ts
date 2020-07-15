import { Injectable } from '@angular/core';
import {
  CanDeactivate,
} from '@angular/router';
import { ProductAddComponent } from 'src/app/components/products/product-add/product-add.component';

@Injectable()
export class ProductAddGuard implements CanDeactivate<ProductAddComponent> {
  constructor() {}
  canDeactivate(component: ProductAddComponent,): boolean {
    if(component.addStatus ){
      return !component.showMessage() || confirm('Navigate away and SAVE all changes?')
    }
    return (
      !component.showMessage() || confirm('Navigate away and LOSE all changes?')
    );
  }
}

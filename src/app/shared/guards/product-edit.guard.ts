import { Injectable } from '@angular/core';
import {
  CanDeactivate,
} from '@angular/router';
import { ProductEditComponent } from '../../components/products/product-edit/product-edit.component';

@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
  constructor() {}
  canDeactivate(component: ProductEditComponent): boolean {
    if(!component.editStatus ){
      return !component.showMessage() || confirm('Navigate away and LOSE all changes?')
    }
    return true
   
  }
}

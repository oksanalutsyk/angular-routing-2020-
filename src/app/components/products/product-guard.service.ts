import { Injectable } from '@angular/core';
import {
  CanDeactivate,
} from '@angular/router';
import { ProductEditComponent } from './product-edit.component';

@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
  constructor() {}
  canDeactivate(component: ProductEditComponent): boolean {
    return (
      !component.showMessage() || confirm('Navigate away and lose all changes?')
    );
  }
}

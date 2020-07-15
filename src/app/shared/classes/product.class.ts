import { ProductInterface } from '../interfaces/product.interface';

export class NewProduct implements ProductInterface {
  constructor(public id: number, public title: string, public body: string) {}
}

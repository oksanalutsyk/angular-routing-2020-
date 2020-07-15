import { IProduct } from '../interfaces/product.interface';

export class NewProduct implements IProduct {
    constructor(public id: number, public title: string, public body: string) {}
  }
  
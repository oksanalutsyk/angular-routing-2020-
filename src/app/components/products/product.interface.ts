export interface IProduct {
    id: number;
    title: string;
    body: string;
    
}

export class NewProduct implements IProduct {
    constructor(
      public id: number,
      public title: string,
      public body: string,
 
    ) {}
  }
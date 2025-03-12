import { Injectable } from '@angular/core';
import { signal,Signal } from '@angular/core';
import { Product } from '../interfaces/product.product';
@Injectable({
  providedIn: 'root'
})
export class AddProductsService {

  products = signal<Product[]>([]);
 //añadiendo esto desde jave

  getProducts(): Signal<Product[]> {
    return this.products;
  }
  addProduct(newProduct: Product) {
    this.products.update(products => [...products, newProduct]);
  }
  getLength():number{
    return this.products().length;
  }
}

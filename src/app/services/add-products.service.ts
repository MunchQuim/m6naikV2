import { Injectable } from '@angular/core';
import { signal, Signal } from '@angular/core';
import { Product } from '../interfaces/product.product';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AddProductsService {

  constructor(private http: HttpClient) {

  }

  products = signal<Product[]>([]);
  //añadiendo esto desde jave

  getProducts(): void { // es de tipo void porque integra en el signal los datos

    this.http.get<Product[]>('http://localhost:2700/products').subscribe(
      (response) => this.products.set(response), //substituir por data? no tiene pinta porque la api lo llama response
      (error) => console.error('Error :', error)
    );
  }
  /* getProductsById(id : number):void {
    this.http.get<Product>('http://localhost:2700/products/'+id).subscribe(
      (response) => this.products.set(response), 
      (error) => console.error('Error :', error)
    );
  } */
  postProducts(newProduct: Product) {
    this.http.post<Product[]>('http://localhost:2700/products',newProduct).subscribe(
      (response) => this.products.update(products => [...products, newProduct]), 
      (error) => console.error('Error :', error)
    );
  }
  putProducts() {

  }
  deleteProduct() {

  }

  /*   addProduct(newProduct: Product) {
      this.products.update(products => [...products, newProduct]);
    } */


  getLength(): number {
    return this.products().length;
  }
}

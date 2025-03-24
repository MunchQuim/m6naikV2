import { inject, Injectable } from '@angular/core';
import { signal, Signal } from '@angular/core';
import { Product } from '../interfaces/product.product';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddProductsService {

  products = signal<Product[]>([]);

  private http = inject(HttpClient); // al ser un servicio no tiene un constructor, se requiere injectarlo directamente

  getProducts(): Signal<Product[]> {
    return this.products;
  }
  addProduct(newProduct: Product) {
    this.products.update(products => [...products, newProduct]);
  }
  async pullProducts():Promise<void>{
    this.http.get("http://localhost:2700/products").subscribe(
      (response: any) => {
        
        this.products.update(() => [...response.productos]);
      })

  }

  updateProductStock(id: number, newStock: number): Observable<any> {
    return this.http.patch(`http://localhost:2700/products/${id}`, { stock: newStock });
  }
  /* const pulledProducts = response.productos; */
  getLength(): number {
    return this.products().length;
  }
}

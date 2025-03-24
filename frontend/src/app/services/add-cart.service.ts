import { inject, Injectable } from '@angular/core';
import { signal, Signal } from '@angular/core';
import { Product } from '../interfaces/product.product';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FunctionsService } from './functions.service';
import { AddProductsService } from './add-products.service';
@Injectable({
  providedIn: 'root'
})
export class AddCartService {
  cart = signal<Product[]>([]);

  private http = inject(HttpClient); // al ser un servicio no tiene un constructor, se requiere injectarlo directamente
  private productService = inject(AddProductsService);

  getCart(): Signal<Product[]> {
    return this.cart;
  }
  async addToCart(newProduct: Product) { //añadir el producto al carrito
    console.log(this.productService.updateProductStock(newProduct.id,newProduct.stock-1))
     // actualizamos el stock en la base de datos
/*     newProduct.stock = newProduct.stock - 1; //reducimos su stock en 1
    this.productService.products.update() */
  }

  async pullCart(): Promise<void> {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      const userId = JSON.parse(userData).id;

      this.http.get("http://localhost:2700/cart/" + userId).subscribe(
        (response: any) => {
          console.log("////////////////////////")
          console.log(response)
          this.cart.update(() => [...response.carrito]);
        }
      
      )
    }
  }

  async pushCart(): Promise<void> {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      const userId = JSON.parse(userData).id;
      console.log('a')
      await this.http.post("http://localhost:2700/cartProducts/" + userId, this.cart).subscribe(

        (response) => {
          console.log('producto subido con éxito:', response);
        },
        (error) => {
          console.error('Error al subir el producto:', error);
        },
      )

    }
  }

}

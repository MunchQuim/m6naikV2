import { inject, Injectable } from '@angular/core';
import { signal, Signal } from '@angular/core';
import { Product } from '../interfaces/product.product';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CartProduct } from '../interfaces/cartProduct';
import { LongCartProduct } from '../interfaces/cartProduct';


@Injectable({
  providedIn: 'root'
})
export class AddCartService {
  cart = signal<CartProduct[]>([]);//menos informacion para la base de datos
  LongCart = signal<LongCartProduct[]>([]); //mas informacion para mostrar en la web


  private http = inject(HttpClient); // al ser un servicio no tiene un constructor, se requiere injectarlo directamente

  //grupos de signal
  getCartProducts(): Signal<CartProduct[]> {
    return this.cart;
  }
  addCartProduct(newCartProduct: CartProduct) {
    this.cart.update(cart => [...cart, newCartProduct]);
  }
  getLongCartProducts(): Signal<LongCartProduct[]> {
    return this.LongCart;
  }
  addLongCartProduct(newLongCartProduct: LongCartProduct) {
    this.LongCart.update(LongCart => [...LongCart, newLongCartProduct]);
  }


  async getDbCartProduct(): Promise<void> {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      const userId = JSON.parse(userData).id;
      this.http.get(`http://localhost:2700/productCarts/${userId}`).subscribe(
        (response: any) => {  
          this.LongCart.update(() => [...response.carrito_products]);
        })
    }
    


    /*  
 
       this.http.get("http://localhost:2700/cart/" + userId).subscribe(
         (response: any) => {
           console.log("////////////////////////")
           console.log(response)
           this.cart.update(() => [...response.carrito]);
         }
 
       )
      */
  }
  //lo sube a la base de datos
  async addToCart(newProduct: Product, cart_id: number, quantity: number) {

    const cartProduct: CartProduct = {
      cart_id: cart_id,
      products_id: newProduct.id,
      quantity: quantity
    }
    this.http.post('http://localhost:2700/cartProducts', cartProduct).subscribe(
      (response) => {

        this.http.patch(`http://localhost:2700/cart/${cart_id}`, null).subscribe(
          (response) => {
            console.log("tiempo reestablecido")
          }
        )
      }
    )


  }






  async pushCart(): Promise<void> {
    const userData = sessionStorage.getItem("user");
    /*  if (userData) {
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
 
     } */
  }

}
// actualizamos el stock en la base de datos
/*     newProduct.stock = newProduct.stock - 1; //reducimos su stock en 1
    this.productService.products.update() */
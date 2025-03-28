import { inject, Injectable } from '@angular/core';
import { signal, Signal } from '@angular/core';
import { Product } from '../interfaces/product.product';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CartProduct } from '../interfaces/cartProduct';
import { LongCartProduct } from '../interfaces/cartProduct';
import { HistorialProduct } from '../interfaces/cartProduct';


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

  //recoge los datos de todos los productos del carrito
  async getDbCartProduct(): Promise<void> {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      const userId = JSON.parse(userData).id;
      this.http.get(`http://localhost:2700/productCarts/${userId}`).subscribe(
        (response: any) => {
          this.LongCart.update(() => [...response.carrito_products]);
        })
    }
  }
  async deleteDbCartProduct(cartProduct_id: number) {
    this.http.delete(`http://localhost:2700/cartProducts/${cartProduct_id}`).subscribe(
      (response: any) => {
        this.LongCart.update(cart => cart.filter(product => product.id !== cartProduct_id));
      }
    )
  }
  async restoreDBProductStock(product_id: number, quantity: number) {
    this.http.get(`http://localhost:2700/products/${product_id}`).subscribe(
      (response: any) => {

        const stock = response.productos[0].stock + quantity;
        this.http.patch(`http://localhost:2700/products/${product_id}`, { stock: stock }).subscribe(
        )
      }
    )

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
  async buyCart( cart_id: number) {
    const userData = sessionStorage.getItem("user");
    let user_id: number;
    if (userData) {
      user_id = JSON.parse(userData).id;

    }
    this.LongCart().forEach(product => {
      const historialProduct: HistorialProduct = {
        users_id: user_id,
        products_id: product.product_id,
        cart_id: product.cart_id,
        quantity: product.quantity,
        imageUrl: product.imageUrl
      }
      this.http.post('http://localhost:2700/historial', historialProduct).subscribe(
        (response) => {
          console.log("historial subido con exito")
          this.http.delete(`http://localhost:2700/cartProducts/${historialProduct.products_id}`).subscribe(
            (response) => {
              console.log("producto eliminado del carrito")
            }
          )
        }
      )
     
    });
    this.http.delete(`http://localhost:2700/cart/${cart_id}`).subscribe(
      (response) => {
        console.log("carrito eliminado")
        this.LongCart.update(() => []);
      }
    )
  }


  async deleteCart(cart_id: number) {

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
import { inject, Injectable } from '@angular/core';
import { signal, Signal } from '@angular/core';
import { Product } from '../interfaces/product.product';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { AddCartService } from './add-cart.service';
@Injectable({
  providedIn: 'root'
})
export class AddProductsService {

  products = signal<Product[]>([]);

  private http = inject(HttpClient); // al ser un servicio no tiene un constructor, se requiere injectarlo directamente
  private addCartService = inject(AddCartService);

  getProducts(): Signal<Product[]> {
    return this.products;
  }
  addProduct(newProduct: Product) {
    this.products.update(products => [...products, newProduct]);
  }


  async pullProducts(): Promise<void> {
    this.http.get("http://localhost:2700/products").subscribe(
      (response: any) => {

        this.products.update(() => [...response.productos]);
      })

  }

  updateProductStock(id: number, newStock: number): Observable<any> {
    return this.http.patch(`http://localhost:2700/products/${id}`, { stock: newStock });
  }

  getLength(): number {
    return this.products().length;
  }
  async reserveProduct(reservedProduct: Product, quantity: number = 1) {
    const storageUser = sessionStorage.getItem("user");
    if (!storageUser) {
      console.error("No user found in session storage.");
      return;
    }

    let user = JSON.parse(storageUser);
    let user_id = user.id;

    try {
      // Consultar el carrito del usuario
      let response: any = await firstValueFrom(this.http.get(`http://localhost:2700/userCart/${user_id}`));

      let cartId: number;

      if (response.carrito.length === 0) {
        console.log("Carrito no encontrado. Creando nuevo...");
        
        await firstValueFrom(this.http.post('http://localhost:2700/carts', { users_id: user_id }));

        // Volvemos a consultar el carrito después de crearlo
        response = await firstValueFrom(this.http.get(`http://localhost:2700/userCart/${user_id}`));
      } else {
        console.log("Carrito ya existente.");
      }

      cartId = response.carrito[0].id;

      // Reducir el stock solo después de asegurarnos de que hay carrito
      reservedProduct.stock -= quantity;

      // Agregar producto al carrito
      this.addCartService.addToCart(reservedProduct, cartId, quantity);

    } catch (error) {
      console.error("Error en la reserva del producto:", error);
    }
  }
}
/* 

 this.http.post("http://localhost:2700/products",newProduct).subscribe(
          (response) =>{
            console.log('Producto registrado con éxito:', response);
          }, 
          (error) =>{
            console.error('Error al registrar el producto:', error);
          }
        );

*/
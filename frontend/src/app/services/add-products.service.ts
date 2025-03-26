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
  async reserveProduct(reservedProduct: Product) {
    const storageUser = sessionStorage.getItem("user");
    if (storageUser !== null) {
      let user = JSON.parse(storageUser);
      let user_id = user['id'];
      this.http.get(`http://localhost:2700/userCart/${user_id}`).subscribe(
        (response: any) => {
          
          if (response['carrito'].length == 0) {
            console.log(user_id)
            this.http.post('http://localhost:2700/carts',{users_id : user_id } ).subscribe(
              (response) => {
                console.log('carrito cread con éxito:', response);
              },
              (error) => {
                console.error('Error al crear el carrito:', error);
              })
          }else{
            console.log('carrito ya existente')
          }
        });


    }

    /* return this.http.post(`http://localhost:2700/cartProducts`, { reservedProduct }); */
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
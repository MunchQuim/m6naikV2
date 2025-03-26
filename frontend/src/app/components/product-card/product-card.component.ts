import { Component, input } from '@angular/core';
import { Input } from '@angular/core';
import { Product } from '../../interfaces/product.product';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddProductsService } from '../../services/add-products.service';
import { AddCartService } from '../../services/add-cart.service';
@Component({
  selector: 'app-product-card',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product?: Product;
  constructor(http: HttpClient, private addProductsService: AddProductsService) {

  }
  get precioFinal(): number | undefined {
    if (this.product) {
      return this.product.price * (100 - this.product.discount) / 100;
    }
    return undefined;
  };
  async reserve(producto?: Product) {

    if (producto) {
      /* console.log(producto); */
      if (producto.stock > 0) {
        await this.addProductsService.reserveProduct(producto);
      }

    }

  }

}


/*       producto.stock = producto.stock - 1;
      await this.addCartService.pullCart();
      this.addCartService.addToCart(producto); */
/*    await this.addCartService.pushCart(); */
/* console.log(this.addCartService.getCart()()); */


/* this.addProductsService.updateProductStock(producto.id, producto.stock)
.subscribe(
  (response) => {
    console.log('Stock actualizado:', response);
  },
  (error) => {
    console.error('Error al actualizar el stock:', error);
  }
); */
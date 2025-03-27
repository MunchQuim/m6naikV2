import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AddCartService } from '../../services/add-cart.service';
import { LongCartProduct } from '../../interfaces/cartProduct';
import { HttpClient, HttpClientXsrfModule } from '@angular/common/http';
@Component({
  selector: 'app-cart-product-card',
  imports: [CommonModule, HttpClientXsrfModule],
  templateUrl: './cart-product-card.component.html',
  styleUrl: './cart-product-card.component.css'
})
export class CartProductCardComponent {
  @Input() cartProduct?: LongCartProduct;
  constructor(private http: HttpClient, private addCartService: AddCartService) {

  }
  get precioFinal(): number | undefined {
    if (this.cartProduct) {
      return this.cartProduct.price * (100 - this.cartProduct.discount) / 100;
    }
    return undefined;
  };

  async borrarProducto(selectedCartProduct: LongCartProduct) {
    await this.addCartService.restoreDBProductStock(selectedCartProduct.product_id,selectedCartProduct.quantity);
    await this.addCartService.deleteDbCartProduct(selectedCartProduct.id);
    await this.addCartService.getDbCartProduct();
  }
}

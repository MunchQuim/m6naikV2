import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AddCartService } from '../../services/add-cart.service';
import { LongCartProduct } from '../../interfaces/cartProduct';
@Component({
  selector: 'app-cart-product-card',
  imports: [CommonModule],
  templateUrl: './cart-product-card.component.html',
  styleUrl: './cart-product-card.component.css'
})
export class CartProductCardComponent {
  @Input() cartProduct?: LongCartProduct;
  constructor(private addCartService: AddCartService) {

  }
  get precioFinal(): number | undefined {
    if (this.cartProduct) {
      return this.cartProduct.price * (100 - this.cartProduct.discount) / 100;
    }
    return undefined;
  };
}

import { Component, effect, Signal } from '@angular/core';
import { CartProductCardComponent } from '../cart-product-card/cart-product-card.component';
import { AddCartService } from '../../services/add-cart.service';
import { CartProduct } from '../../interfaces/cartProduct';
import { LongCartProduct } from '../../interfaces/cartProduct';

@Component({
  selector: 'app-carrito',
  imports: [CartProductCardComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  cart_products: Signal<LongCartProduct[]>;
  viewCart_Products: LongCartProduct[] = [];
  //filter: string = '';
  size: number = 0;

  constructor(private cartService: AddCartService) {
    this.cart_products = this.cartService.getLongCartProducts();

    effect(() => {
      this.viewCart_Products = this.cart_products();
    });
  }
  ngOnInit() {
    this.cartService.getDbCartProduct();
  }
}

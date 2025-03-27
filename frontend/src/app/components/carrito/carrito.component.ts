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
  products: Signal<LongCartProduct[]>;
  viewProducts: LongCartProduct[] = [];
  //filter: string = '';
  size: number = 0;

  constructor(private cartService: AddCartService) {
    this.products = this.cartService.getLongCartProducts();

    effect(() => {
      this.viewProducts = this.products();
      console.log(this.viewProducts);
    });
  }
  ngOnInit() {
    this.cartService.getDbCartProduct();
  }
}

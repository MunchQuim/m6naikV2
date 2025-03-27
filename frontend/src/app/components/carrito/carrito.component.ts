import { Component, effect, Signal } from '@angular/core';
import { CartProductCardComponent } from '../cart-product-card/cart-product-card.component';
import { AddCartService } from '../../services/add-cart.service';
import { CartProduct } from '../../interfaces/cartProduct';
import { LongCartProduct } from '../../interfaces/cartProduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  imports: [CartProductCardComponent, CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  cart_products: Signal<LongCartProduct[]>;
  viewCart_Products: LongCartProduct[] = [];
  total = 0;

  constructor(private cartService: AddCartService) {
    this.cart_products = this.cartService.getLongCartProducts();

    effect(() => {
      this.viewCart_Products = this.cart_products();
      this.total = this.getTotalPrice();
    });
  }
  ngOnInit() {
    this.cartService.getDbCartProduct();
  }
  getTotalPrice(): number {
    return this.viewCart_Products.reduce((total, producto) => {
      const precioConDescuento = producto.price * (1 - producto.discount / 100);
      return total + precioConDescuento;
    }, 0);
  }
}

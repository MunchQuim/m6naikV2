import { Component, Signal } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { AddProductsService } from '../../services/add-products.service';
import { Product } from '../../interfaces/product.product';
@Component({
  selector: 'app-carrito',
  imports: [ProductCardComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  products: Signal<Product[]>;
  viewProducts: Product[] = [];
  //filter: string = '';
  size: number = 0;

  constructor(private productService: AddProductsService) {
    this.productService.pullProducts();
    this.products = this.productService.getProducts();
    this.viewProducts = this.products();
  }
  ngOnInit() {
    // Llamamos al método para obtener los productos en el ciclo de vida OnInit
    //si no lo hago de esta manera y lo junto, da problemas al intentar meter un signal de array de productos a un array de productos
    this.productService.pullProducts();
    console.log('products:' + this.products);
    this.size = this.products.length;
  }
}

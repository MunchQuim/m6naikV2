import { Component,Signal } from '@angular/core';
import { AddProductsService } from '../../services/add-products.service';
import { Product } from '../../interfaces/product.product';
import { OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Signal<Product[]>;
  viewProducts: Product[] = [];
  filter: string = '';
  size: number = 0;
  constructor(private productService: AddProductsService) {
    this.products = this.productService.getProducts();
    this.viewProducts = this.products();
  }
  ngOnInit() {
    // Llamamos al método para obtener los productos en el ciclo de vida OnInit
     //si no lo hago de esta manera y lo junto, da problemas al intentar meter un signal de array de productos a un array de productos
    console.log('products:'+this.products);
    this.size = this.products.length;
  }
  setFilter(event: Event): void{
    const inputElement = event.target as HTMLInputElement;
    this.filter = inputElement.value;
    if(this.filter != ''){
      this.viewProducts = this.products().filter(product=>product.id.includes(this.filter)||product.nombre.includes(this.filter))
    }else{
      this.viewProducts = this.products();
    }
  }
}

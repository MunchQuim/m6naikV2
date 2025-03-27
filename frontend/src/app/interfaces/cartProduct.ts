
export interface CartProduct {
    cart_id:number
    products_id:number,
    quantity:number,
}
export interface LongCartProduct{ //cualquier cambio en esta interfaz debe tener en cuenta el get productos del carrito por id del API
    cart_id:number
    products_id:number,
    quantity:number,
    name:string,
    price:number,
    discount:number,
    imageUrl:string,
    productType:number
}
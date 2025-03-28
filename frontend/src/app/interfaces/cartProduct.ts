
export interface CartProduct {
    cart_id:number
    products_id:number,
    quantity:number,
}
export interface LongCartProduct{ //cualquier cambio en esta interfaz debe tener en cuenta el get productos del carrito por id del API
    id:number,
    cart_id:number
    product_id:number,
    quantity:number,
    name:string,
    price:number,
    discount:number,
    imageUrl:string,
    productType:number
}
export interface HistorialProduct{
    users_id:number,
    products_id:number,
    cart_id:number,
    quantity:number,
    buyedAt?:Date
    imageUrl:string
}

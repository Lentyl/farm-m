import { type } from "os"




export interface Product {
    name: string,
    price: number,
    capacity: number,
}
export interface LocationLatLng {
    lat: number
    lng: number
}


export interface Seller {
    id: string,
    name: string,
    postcode: string,
    city: string,
    street: string,
    email: string,
    location: LocationLatLng,
    products: Product[],
    searchedProduct: string,

}

export type SellersArr = Seller[]



//Products

export interface Order {
    productName: string,
    productPrice: number,
    productQuantity: number,
    productCapacity: number,
    sellerId: string,
}

export type ExtraProduct = string ; 
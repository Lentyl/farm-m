



export interface Product {
    name: string,
    price: number,
    capacity: number,
}


export interface Seller {
    id: string,
    name: string,
    postcode: string,
    city: string,
    street: string,
    email: string,
    products: Product[],
    searchedProduct: string,

}

export type SellersArr = Seller[]



//Products

export interface Order {
    sellerId: string,
    productName: string,
    productPrice: number,
}
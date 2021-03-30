export interface User {
    name: string;
    email: string;
    id: string;
    businessStatus: string;
    password?: string;
    location?: LocationLatLng; 
    postcode?: string;
    city?: string;
    street?: string;
    products?: Product[];
    productType?: string[];
    
}


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

export interface FullOrder {
    buyerId: string,
    date: string,
    totalValue: number,
    orderStatus: string,
    merchandise: Order[]
}

export interface AlertType {
    type: 'primary' 
    | 'success' 
    | 'danger' 
    | 'info',
    heading: string,
    msg?: string
}

export interface SellerOrderDetails {
    name: string,
    postcode: string,
    city: string,
    street: string,
    email: string,
    location: LocationLatLng,
}



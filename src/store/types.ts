
import { Order, Product, Seller, SellersArr, ExtraProduct } from './uiData/dataTypes'




export const SET_USER = "SET_USER";
export const SET_BUSINESS_USER = "SET_BUSINESS_USER";
export const SIGN_OUT = "SIGN_OUT";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const NEED_VERIFICATION = "NEED_VERIFICATION";
export const SET_SUCCESS = "SET_SUCCESS";
export const SET_AUTHENTICATION = "SET_AUTHENTICATION";


export interface User {
  name: string;
  password: string;
  email: string;
  id: string;
  postcode?: string;
  city?: string;
  street?: string;
  products?: Product[];
}

export interface SignUpData {
  name: string;
  password: string;
  email: string;
}


export interface BusinessSignUpData extends SignUpData {
  postcode: string;
  city: string;
  street: string;
  products: Product[];
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthenticationData {
  authentication: boolean;
}

//initial State
export interface InitialAutgState {
  user: User | null;
  error: string;
  authentication: boolean;
}

//Actions
interface SetUserAction {
  type: typeof SET_USER
  data: User;
}

interface SetBusinessUserAction {
  type: typeof SET_BUSINESS_USER;
  data: User;
}

interface SignOutAction {
  type: typeof SIGN_OUT;
}

interface SetErrorAction {
  type: typeof SET_ERROR
  data: string
}


interface setAuthentication {
  type: typeof SET_AUTHENTICATION
  data: AuthenticationData
}

export type AuthAction =
  | SetUserAction
  | SetBusinessUserAction
  | SignOutAction
  | SetErrorAction
  | setAuthentication;


//Logged Types

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_SELLER = 'GET_SELLER'
export const SET_CART_AMOUNT = 'SET_CART_AMOUNT'
export const SET_ORDER = 'SET_ORDER'
export const MAP_LOADED = 'MAP_LOADED'
export const ADD_EXTRA_PRODUCT = 'ADD_EXTRA_PRODUCT'


export interface initialLoggedState {
  products: Product[],
  sellers: SellersArr,
  cartAmount: number,
  order: Order[],
  mapLoaded: boolean,

}


interface GetProducts {
  type: typeof GET_PRODUCTS,
  data: Product[]
}

interface GetSeller {
  type: typeof GET_SELLER,
  data: SellersArr
}

interface SetCartAmount {
  type: typeof SET_CART_AMOUNT,
  data: number
}
interface SetOrder {
  type: typeof SET_ORDER,
  data: Order
}
interface MapLoaded {
  type: typeof MAP_LOADED
  data: boolean
}

interface AddExtraProduct {
  type: typeof ADD_EXTRA_PRODUCT
  data: ExtraProduct
}

export type LoggedActions =
  | GetProducts
  | GetSeller
  | SetCartAmount
  | SetOrder
  | MapLoaded
  | AddExtraProduct












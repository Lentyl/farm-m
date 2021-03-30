import { FullOrder, Order, Product, SellersArr, LocationLatLng, SellerOrderDetails, User } from './uiData/dataTypes'

export const SET_USER = "SET_USER";
export const SET_BUSINESS_USER = "SET_BUSINESS_USER";
export const SIGN_OUT = "SIGN_OUT";
export const NEED_VERIFICATION = "NEED_VERIFICATION";
export const SET_SUCCESS = "SET_SUCCESS";
export const SET_AUTHENTICATION = "SET_AUTHENTICATION";
export const DELETE_PRODUCT = "DELETE_PRODUCT";


export interface SignUpData {
  name: string;
  password: string;
  email: string;
}

export interface BusinessSignUpData extends SignUpData {
  postcode: string;
  city: string;
  street: string;
  location: LocationLatLng;
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
  authentication: boolean;
  success: string
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

interface setAuthentication {
  type: typeof SET_AUTHENTICATION
  data: AuthenticationData
}

interface SetSuccessAction {
  type: typeof SET_SUCCESS;
  data: string;
}

export type AuthAction =
  | SetUserAction
  | SetBusinessUserAction
  | SignOutAction
  | SetSuccessAction
  | setAuthentication;
  


//Logged Types

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const SET_CART_AMOUNT = 'SET_CART_AMOUNT'
export const SET_ORDER = 'SET_ORDER'
export const MAP_LOADED = 'MAP_LOADED'
export const ADD_EXTRA_PRODUCT = 'ADD_EXTRA_PRODUCT'
export const SET_LOADING = 'SET_LOADING'
export const GET_All_ORDERS = 'GET_All_ORDERS'
export const GET_SELLER_ORDER_DETAILS = 'GET_SELLER_ORDER_DETAILS'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_URL = 'UPDATE_URL'



export interface initialLoggedState {
  sellersProducts: SellersArr,
  cartAmount: number,
  order: Order[],
  mapLoaded: boolean,
  loading: boolean,
  allOrders: FullOrder[],
  sellersDetails: SellerOrderDetails[],
  url: string,
}


interface GetProducts {
  type: typeof GET_PRODUCTS,
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
  data: string
}
interface DeleteProduct {
  type: typeof DELETE_PRODUCT
  data: string
}

interface SetLoading {
  type: typeof SET_LOADING;
  data: boolean;
}

interface GetAllOrders {
  type: typeof GET_All_ORDERS;
  data: FullOrder[];
}

interface GetSellerOrderDetails {
  type: typeof GET_SELLER_ORDER_DETAILS;
  data: SellerOrderDetails[]
}
interface UpdateUrl {
  type: typeof UPDATE_URL;
  data: string
}


export type LoggedActions =
  | GetProducts
  | SetCartAmount
  | SetOrder
  | MapLoaded
  | AddExtraProduct
  | DeleteProduct
  | SetLoading
  | GetAllOrders
  | GetSellerOrderDetails
  | SetUserAction
  | UpdateUrl












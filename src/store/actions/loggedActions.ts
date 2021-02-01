import { ThunkAction } from "redux-thunk";
import firebase from "../../firebase/config";
import { LoggedActions, GET_PRODUCTS, GET_SELLER, SET_CART_AMOUNT, SET_ORDER, MAP_LOADED, ADD_EXTRA_PRODUCT } from "../types";
import { RootState } from "..";
import { Order, Seller, ExtraProduct } from "../uiData/dataTypes";




export const getProducts = (
    searchValue: string
): ThunkAction<void, RootState, null, LoggedActions> => {
    return async (dispatch) => {
        try {

            await firebase
                .firestore()
                .collection("business")
                .where('productType', 'array-contains', searchValue)
                .get()
                .then(snapshot => {
                    snapshot.docs.map(doc => {

                        const sellers = doc.data()

                        const location = { lat: 44.5, lng: 60.4 }

                        const sellerArr: Seller = {
                            id: sellers.name,
                            name: sellers.name,
                            postcode: sellers.postcode,
                            city: sellers.city,
                            street: sellers.street,
                            email: sellers.email,
                            location: location,
                            products: sellers.products,
                            searchedProduct: searchValue,
                        }

                        dispatch({
                            type: GET_SELLER,
                            data: [sellerArr],
                        })

                    })
                })


        } catch (err) {
            console.log(err);
        }

    }
}

/* export const setCartAmount = (
    cartAmount: number
): ThunkAction<void, RootState, null, LoggedActions> => {
    return (dispatch) => {

        dispatch({
            type: SET_CART_AMOUNT,
            data: cartAmount,
        })
    }
} */
export const setOrder = (
    order: Order
): ThunkAction<void, RootState, null, LoggedActions> => {
    return (dispatch) => {

        dispatch({
            type: SET_ORDER,
            data: order,
        })
    }
}
export const addExtraProduct = (
    product: ExtraProduct
): ThunkAction<void, RootState, null, LoggedActions> => {
    return (dispatch) => {

        
        dispatch({
            type: ADD_EXTRA_PRODUCT,
            data: product,
        })
    }
}

export const setMapLoaded = (
    mapLoaded: boolean
): ThunkAction<void, RootState, null, LoggedActions> => {

    return (dispatch) => {

        dispatch({
            type: MAP_LOADED,
            data: mapLoaded,
        })
    }
}
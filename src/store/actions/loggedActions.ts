import { ThunkAction } from "redux-thunk";
import firebase from "../../firebase/config";
import { LoggedActions, SET_LOADING, GET_SELLER, SET_ORDER, MAP_LOADED, ADD_EXTRA_PRODUCT, DELETE_PRODUCT, GET_All_ORDERS, GET_SELLER_ORDER_DETAILS } from "../types";
import { RootState } from "..";
import { Order, Seller, FullOrder, SellerOrderDetails } from "../uiData/dataTypes";
import { User} from "../../store/uiData/dataTypes";




export const getProducts = (
    searchValue: string
): ThunkAction<void, RootState, null, LoggedActions> => {
    return async (dispatch) => {
        try {

            await firebase
                .firestore()
                .collection("users")
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
    product: string
): ThunkAction<void, RootState, null, LoggedActions> => {
    return (dispatch) => {
        dispatch({
            type: ADD_EXTRA_PRODUCT,
            data: product,
        })
    }
}
export const deleteProduct = (
    product: string
): ThunkAction<void, RootState, null, LoggedActions> => {

    
    return (dispatch) => {
        dispatch({
            type: DELETE_PRODUCT,
            data: product,
        })
    }
}

export const makeOrder = (
    order: FullOrder
): ThunkAction<void, RootState, null, LoggedActions> => {

    return async (dispatch) => {
        try {
             await firebase
                .firestore()
                .collection("orders")
                .doc(order.date)
                .set(order)
                .then(()=>{
                    dispatch(setLoading(false))
                })
            
        } catch (err) {
            console.log(err);
        }
    }

}
export const getAllOrders = (
    uid:string
): ThunkAction<void, RootState, null, LoggedActions> => {

  
    return async (dispatch) => {
        try {

            const orders:FullOrder[] = []

             await firebase
                .firestore()
                .collection("orders")
                .where('buyerId', '==', uid)
                .get()
                .then(snapshot => {
                    dispatch(setLoading(false))
                snapshot.docs.map(doc => {
                const userOrderDb = doc.data()
                const userOrder:FullOrder = {
                    buyerId: userOrderDb.buyerId,
                    date: userOrderDb.date,
                    totalValue: userOrderDb.totalValue,
                    orderStatus: userOrderDb.orderStatus,
                    merchandise: userOrderDb.merchandise
               } 

                orders.push(userOrder)
           
            })

                dispatch({
                type: GET_All_ORDERS,
                data: orders,
                })  

        })} catch (err) {
            console.log(err);
        }
    }
}
export const getSellerOrderDetails = (
    uid:string
): ThunkAction<void, RootState, null, LoggedActions> => {


  
    return async (dispatch) => {

        try {

            await firebase
                .firestore()
                .collection("users")
                .where('id','==', uid)
                .get()
                .then(snapshot => {
                    dispatch(setLoading(false))
                 
                    snapshot.docs.map(doc => {
                    
                        const sellerDb = doc.data()

                        const sellerOrderDetails: SellerOrderDetails = {
                        name: sellerDb.name,
                        postcode: sellerDb.postcode,
                        street: sellerDb.street,
                        city: sellerDb.city,
                        email: sellerDb.email,
                        location: sellerDb.location
                        }

                          dispatch({
                            type: GET_SELLER_ORDER_DETAILS,
                            data: [sellerOrderDetails],
                            }) 
                        
                })

            })

        } catch (err) {
            console.log(err);
        }
    }
}

export const updateUser = (
    user:User
): ThunkAction<void, RootState, null, LoggedActions> => {

    console.log(user);
    return async (dispatch) => {
        dispatch(setLoading(false))
       
      try {
             await firebase
                .firestore()
                .collection('/users')
                .doc(user.id)
                .update({
                    
                })
                .then(()=>{
                    dispatch(setLoading(false))
                })
            
        } catch (err) {
            console.log(err);
        } 
    }

}



export const setLoading = (
    value: boolean
  ): ThunkAction<void, RootState, null, LoggedActions> => {
    return (dispatch) => {
      dispatch({
        type: SET_LOADING,
        data: value,
      });
    };
  };


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
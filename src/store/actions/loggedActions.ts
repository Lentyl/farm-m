import { ThunkAction } from "redux-thunk";
import firebase from "../../firebase/config";
import { LoggedActions, GET_PRODUCTS, GET_SELLER } from "../types";
import { RootState } from "..";
import { Seller } from "../uiData/dataTypes";




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

                        // console.log('users ', doc.data());
                        //console.log(products);

                        const sellerArr: Seller = {
                            id: sellers.name,
                            name: sellers.name,
                            postcode: sellers.postcode,
                            city: sellers.city,
                            street: sellers.street,
                            email: sellers.email,
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
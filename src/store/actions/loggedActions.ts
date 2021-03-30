import { ThunkAction } from "redux-thunk";
import firebase from "../../firebase/config";
import {
  LoggedActions,
  SET_LOADING,
  SET_ORDER,
  MAP_LOADED,
  ADD_EXTRA_PRODUCT,
  DELETE_PRODUCT,
  GET_All_ORDERS,
  GET_SELLER_ORDER_DETAILS,
  SET_USER,
  UPDATE_URL,
  GET_PRODUCTS,
} from "../types";
import { RootState } from "..";
import {
  Order,
  Seller,
  FullOrder,
  SellerOrderDetails,
} from "../uiData/dataTypes";
import { User } from "../../store/uiData/dataTypes";

export const getProducts = (
  searchValue: string,
  setSearchLoading: () => void
): ThunkAction<void, RootState, null, LoggedActions> => {
  return async (dispatch) => {
    try {
      const sellersProducts: Seller[] = [];
      await firebase
        .firestore()
        .collection("users")
        .where("productType", "array-contains", searchValue.toLocaleLowerCase())
        .get()
        .then((snapshot) => {
          snapshot.docs.map((doc) => {
            const sellers = doc.data();

            const sellersArr: Seller = {
              id: sellers.id,
              name: sellers.name,
              postcode: sellers.postcode,
              city: sellers.city,
              street: sellers.street,
              email: sellers.email,
              location: sellers.location,
              products: sellers.products,
              searchedProduct: searchValue,
            };
            sellersProducts.push(sellersArr);
          });
        });

      dispatch({
        type: GET_PRODUCTS,
        data: sellersProducts,
      });
      setSearchLoading();
    } catch (err) {
      alert(err);
      setSearchLoading();
    }
  };
};

export const setOrder = (
  order: Order
): ThunkAction<void, RootState, null, LoggedActions> => {
  return (dispatch) => {
    dispatch({
      type: SET_ORDER,
      data: order,
    });
  };
};
export const addExtraProduct = (
  product: string
): ThunkAction<void, RootState, null, LoggedActions> => {
  return (dispatch) => {
    dispatch({
      type: ADD_EXTRA_PRODUCT,
      data: product,
    });
  };
};
export const deleteProduct = (
  product: string
): ThunkAction<void, RootState, null, LoggedActions> => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PRODUCT,
      data: product,
    });
  };
};

export const makeOrder = (
  order: FullOrder,
  setLoading: () => void,
  orderSent: () => void
): ThunkAction<void, RootState, null, LoggedActions> => {
  return async (dispatch) => {
    try {
      await firebase
        .firestore()
        .collection("orders")
        .doc(order.date)
        .set(order)
        .then(() => {
          setLoading();
          orderSent();
          dispatch(deleteProduct("all"));
        });
    } catch (err) {
      alert(err);
      setLoading();
    }
  };
};
export const getAllOrders = (
  uid: string
): ThunkAction<void, RootState, null, LoggedActions> => {
  return async (dispatch) => {
    try {
      const orders: FullOrder[] = [];

      await firebase
        .firestore()
        .collection("orders")
        .where("buyerId", "==", uid)
        .get()
        .then((snapshot) => {
          dispatch(setLoading(false));
          snapshot.docs.map((doc) => {
            const userOrderDb = doc.data();
            const userOrder: FullOrder = {
              buyerId: userOrderDb.buyerId,
              date: userOrderDb.date,
              totalValue: userOrderDb.totalValue,
              orderStatus: userOrderDb.orderStatus,
              merchandise: userOrderDb.merchandise,
            };

            orders.push(userOrder);
          });

          dispatch({
            type: GET_All_ORDERS,
            data: orders,
          });
        });
    } catch (err) {
      alert(err);
    }
  };
};
export const getSellerOrderDetails = (
  uid: string,
  setLoadingBtn: () => void
): ThunkAction<void, RootState, null, LoggedActions> => {
  console.log(uid);

  return async (dispatch) => {
    try {
      await firebase
        .firestore()
        .collection("users")
        .where("id", "==", uid)
        .get()
        .then((snapshot) => {
          snapshot.docs.map((doc) => {
            const sellerDb = doc.data();

            const sellerOrderDetails: SellerOrderDetails = {
              name: sellerDb.name,
              postcode: sellerDb.postcode,
              street: sellerDb.street,
              city: sellerDb.city,
              email: sellerDb.email,
              location: sellerDb.location,
            };

            dispatch({
              type: GET_SELLER_ORDER_DETAILS,
              data: [sellerOrderDetails],
            });

            setLoadingBtn();
          });
        });
    } catch (err) {
      alert(err);
      setLoadingBtn();
    }
  };
};

export const updateUser = (
  user: User,
  email: boolean = false,
  password?: string
): ThunkAction<void, RootState, null, LoggedActions> => {
  return async (dispatch) => {
    try {
      await firebase
        .firestore()
        .collection("/users")
        .doc(user.id)
        .update({
          name: user.name,
          email: user.email,
          postcode: user.postcode,
          city: user.city,
          street: user.street,
          productType: user.products!.map((product) => product.name),
          products: user.products,
          location: user.location,
        })
        .then(() => {
          dispatch({
            type: SET_USER,
            data: user,
          });
          dispatch(setLoading(false));
        });
    } catch (err) {
      alert(err);
    }

    if (email) {
      const cUser = firebase.auth().currentUser;

      if (cUser!.email && password) {
        console.log("coś tam");

        try {
          const res = await firebase
            .auth()
            .signInWithEmailAndPassword(cUser!.email, password);

          if (res.operationType === "signIn") {
            cUser!
              .updateEmail(user.email)
              .then(() => {
                console.log("Update successful.");
              })
              .catch((error) => {
                console.log(error);
              });
          }
        } catch (err) {
          alert(err);
        }
      }
    }
  };
};

export const updateUrl = (
  url: string
): ThunkAction<void, RootState, null, LoggedActions> => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_URL,
      data: url,
    });
  };
};

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
    });
  };
};

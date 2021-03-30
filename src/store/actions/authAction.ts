import { ThunkAction } from "redux-thunk";
import {
  AuthAction,
  SET_AUTHENTICATION,
  SET_USER,
  SET_BUSINESS_USER,
  SET_SUCCESS,
  SIGN_OUT,
  SignUpData,
  BusinessSignUpData,
  LoginData,
  AuthenticationData,
} from "../types";
import { User } from "../../store/uiData/dataTypes";
import { setLoading } from "./loggedActions";
import { RootState } from "..";
import firebase from "../../firebase/config";

export const signUp = (
  data: SignUpData,
  setLoading: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);

      if (res.user) {
        const userData: User = {
          name: data.name,
          password: data.password,
          email: data.email,
          id: res.user.uid,
          businessStatus: "private",
        };
        await firebase
          .firestore()
          .collection("/users")
          .doc(res.user.uid)
          .set(userData);

        dispatch({
          type: SET_USER,
          data: userData,
        });
      }

      if (res.operationType === "signIn") {
        const authentication: boolean = true;
        dispatch(authenticationSetup({ authentication }));
        setLoading();
      }
    } catch (err) {
      alert(err);
      setLoading();
    }
  };
};

export const businessSignup = (
  data: BusinessSignUpData,
  setLoading: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  const productType = data.products.map((product) => product.name);

  return async (dispatch) => {
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);

      if (res.user) {
        const userData: User = {
          name: data.name,
          password: data.password,
          email: data.email,
          id: res.user.uid,
          postcode: data.postcode,
          city: data.city,
          street: data.street,
          products: data.products,
          productType: productType,
          location: data.location,
          businessStatus: "business",
        };

        await firebase
          .firestore()
          .collection("/users")
          .doc(res.user.uid)
          .set(userData);

        dispatch({
          type: SET_BUSINESS_USER,
          data: userData,
        });
      }

      if (res.operationType === "signIn") {
        const authentication: boolean = true;
        dispatch(authenticationSetup({ authentication }));
        setLoading();
      }
    } catch (err) {
      alert(err);
      setLoading();
    }
  };
};

export const login = (
  data: LoginData,
  setLoading: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);

      if (res.operationType === "signIn") {
        const authentication: boolean = true;
        dispatch(authenticationSetup({ authentication }));
        dispatch(setUser(res.user!.uid));
        setLoading();
      }
    } catch (err) {
      alert(err);
      setLoading();
    }
  };
};

export const signOut = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      await firebase.auth().signOut();
      dispatch(setLoading(false));
      dispatch({
        type: SIGN_OUT,
      });
    } catch (err) {
      alert(err);
    }
  };
};

export const authenticationSetup = (
  authentication: AuthenticationData
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_AUTHENTICATION,
      data: authentication,
    });
  };
};

export const setUser = (
  uid: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      await firebase
        .firestore()
        .collection("users")
        .where("id", "==", uid)
        .get()
        .then((snapshot) => {
          snapshot.docs.map((doc) => {
            const userDb = doc.data();

            const user: User = {
              id: userDb.id,
              name: userDb.name,
              email: userDb.email,
              postcode: userDb.postcode,
              city: userDb.city,
              street: userDb.street,
              businessStatus: userDb.businessStatus,
              products: userDb.products,
              location: userDb.location,
            };

            dispatch({
              type: SET_USER,
              data: user,
            });
          });
        });
    } catch (err) {
      alert(err);
    }
  };
};

export const setSuccess = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SUCCESS,
      data: msg,
    });
  };
};

export const sendPasswordResetEmail = (
  email: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      dispatch(setSuccess("email został wysłany"));
    } catch (err) {
      alert(err);
    }
  };
};

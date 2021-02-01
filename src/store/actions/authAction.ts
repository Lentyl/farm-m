
import { ThunkAction } from "redux-thunk";
import { AuthAction, SET_AUTHENTICATION, SET_USER, SET_BUSINESS_USER, SET_ERROR, SIGN_OUT, SignUpData, BusinessSignUpData, LoginData, User, AuthenticationData } from "../types";

import { RootState } from "..";
import firebase from "../../firebase/config";

export const signup = (
  data: SignUpData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {

  return async (dispatch) => {
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)

      if (res.user) {
        const userData: User = {
          name: data.name,
          password: data.password,
          email: data.email,
          id: res.user.uid,
        };
        await firebase
          .firestore()
          .collection("/users")
          .doc(res.user.uid)
          .set(userData);

        dispatch({
          type: SET_USER,
          data: userData
        })
      }

      if (res.operationType === 'signIn') {
        console.log(res.operationType);
        const authentication: boolean = true
        dispatch(authenticationSetup({ authentication }));
      }

    } catch (err) {
      console.log(err);
      onError();
      dispatch({
        type: SET_ERROR,
        data: err.message,
      })
    }

  }
}


export const businessSignup = (
  data: BusinessSignUpData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {

  return async (dispatch) => {

    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)

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
        };

        await firebase
          .firestore()
          .collection("/business")
          .doc(res.user.uid)
          .set(userData);

        dispatch({
          type: SET_BUSINESS_USER,
          data: userData
        })
      }

      if (res.operationType === 'signIn') {
        const authentication: boolean = true
        dispatch(authenticationSetup({ authentication }));
      }


    } catch (err) {
      console.log(err);
      onError();
      dispatch({
        type: SET_ERROR,
        data: err.message,
      })
    }
  }
}

export const login = (
  data: LoginData,
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)

      if (res.operationType === 'signIn') {
        const authentication: boolean = true
        dispatch(authenticationSetup({ authentication }));
      }

    } catch (err) {
      console.log(err);
      dispatch({
        type: SET_ERROR,
        data: err.message,
      })
    }
  }
}

export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      await firebase.auth().signOut();
      dispatch({
        type: SIGN_OUT,
      });
    } catch (err) {
      console.log(err);
    }

  }

}

export const setError = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_ERROR,
      data: msg,
    })
  }
}

export const authenticationSetup = (
  authentication: AuthenticationData,
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_AUTHENTICATION,
      data: authentication,
    })
  }
}
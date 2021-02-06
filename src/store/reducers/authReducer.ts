
import { SET_USER, SET_BUSINESS_USER, SET_ERROR, SET_AUTHENTICATION, SIGN_OUT, InitialAutgState, AuthAction } from "../types";

const initialState: InitialAutgState = {
  user: null,
  error: '',
  authentication: false,
};

export default (state = initialState, action: AuthAction): InitialAutgState => {

  switch (action.type) {
    case SET_USER:

    console.log(action.data);
      return {
        ...state,
        user: action.data,
      };
    case SET_BUSINESS_USER:
      return {
        ...state,
        user: action.data,
      };
    case SIGN_OUT:
      return {
        ...state,
        authentication: false,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.data
      }
    case SET_AUTHENTICATION:
      return {
        ...state,
        ...action.data
      }
    default:
      return state;
  }
}; 

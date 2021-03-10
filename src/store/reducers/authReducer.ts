
import { SET_USER, SET_BUSINESS_USER, SET_ERROR, SET_SUCCESS, SET_AUTHENTICATION, SIGN_OUT, InitialAutgState, AuthAction } from "../types";

const initialState: InitialAutgState = {
  user: null,
  error: '',
  authentication: false,
  success: "",
};

export default (state = initialState, action: AuthAction): InitialAutgState => {

  switch (action.type) {
    case SET_USER:
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
    case SET_SUCCESS:
        return {
          ...state,
          success: action.data,
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

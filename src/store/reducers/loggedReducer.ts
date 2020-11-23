import Products from '../../pages/Products';
import { GET_PRODUCTS, GET_SELLER, initialLoggedState, LoggedActions } from '../types'


const initialState: initialLoggedState = {
    products: [],
    sellers: [],
}

export default (state = initialState, action: LoggedActions): initialLoggedState => {

    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: [...state.products, ...action.data]
            }

        case GET_SELLER:
            return {
                ...state,
                sellers: [...state.sellers, ...action.data]
            }

        default:
            return state;
    }
}



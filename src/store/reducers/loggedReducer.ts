import { stat } from 'fs';
import Products from '../../pages/Products';
import { GET_PRODUCTS, GET_SELLER, initialLoggedState, LoggedActions, SET_CART_AMOUNT, SET_ORDER, MAP_LOADED, ADD_EXTRA_PRODUCT, DELETE_PRODUCT } from '../types'
import { Order } from '../uiData/dataTypes';


const initialState: initialLoggedState = {
    products: [],
    sellers: [],
    cartAmount: 0,
    order: [],
    mapLoaded: false,

}

export default (state = initialState, action: LoggedActions): initialLoggedState => {

    switch (action.type) {
        /*      case GET_PRODUCTS:
                 return {
                     ...state,
                     products: [...state.products, ...action.data]
                 } */

        case GET_SELLER:
            return {
                ...state,
                sellers: [...state.sellers, ...action.data]
            }
        /*         case SET_CART_AMOUNT:
                    return {
                        ...state,
                        cartAmount: action.data,
                    } */
        case SET_ORDER:

            let data: Order[] = []

            if (state.order.length < 1) {
                data = [action.data]
            } else {

                const index = state.order.findIndex(item => item.sellerId === action.data.sellerId && item.productName === action.data.productName);
                if (index < 0) {
                    data = [...state.order, action.data]
                } else {
                    const arr = [...state.order]
                    const quantity = arr[index].productQuantity + 1
                    arr[index].productQuantity = quantity;
                    data = arr

                }


            }

            let amount: number = 0


            data.forEach(element => {
                amount += element.productQuantity

            });

            return {
                ...state,
                order: data,
                cartAmount: amount,

            }
        case ADD_EXTRA_PRODUCT:

            const order: Order[] =  state.order.map(product=>{ 
                if(product.productName===action.data) 
                product.productQuantity++

                return product
            })

            return {
                ...state,
                order: order,
            }

        case DELETE_PRODUCT:

            const afterDeleting:Order[] = state.order.filter(product => product.productName !== action.data);

            let amountAfterDeleting: number = 0
            afterDeleting.forEach(item=>{ 
                amountAfterDeleting += item.productQuantity
            })
    
            return {
                ...state,
                order: afterDeleting,
                cartAmount: amountAfterDeleting,
                
            }

        case MAP_LOADED:
            return {
                ...state,
                mapLoaded: action.data,

            }

        default:
            return state;
    }
}



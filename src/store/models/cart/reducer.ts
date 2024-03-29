// Tipagem p/ tipar o Reducer criado
import { Reducer } from "redux"
import { produce } from 'immer';

import { ActionTypes, ICartState } from "./types"

// Valor inicial do Estado
const INITIAL_STATE: ICartState  = {
    items: [],
    failedStockCheck: []
}

export const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch(action.type) {
      // SUCESSO
      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(item =>
          item.product.id === product.id
        );

        if(productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity += 1; 
        } else {
          draft.items.push({
            product,
            quantity: 1,
          })
        }
        break;
      }

      // FALHA
      case ActionTypes.addProductToCartFailue: {
        console.log('failure', action.payload);
        draft.failedStockCheck.push(action.payload.productId);
        break;
      }

      default: {
        return draft;
      }
    }
  })
}


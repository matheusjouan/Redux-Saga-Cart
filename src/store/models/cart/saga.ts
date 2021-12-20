import { AxiosResponse } from 'axios';
import { all, select, takeLatest, call, put } from 'redux-saga/effects';
import { IState } from '../..';
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './action';
import { ActionTypes } from './types';

import api from '../../../services/api';

interface IStockResponse {
  id: number;
  quantity: number;
}

// Tipagem do Saga ReturnType<typeof ACTION DO REDUX que chama a função>
type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

// Função que será executado no Saga
// payload são os dados vindo da Action do Redux

function* checkProductStock({ payload }: CheckProductStockRequest) {
  // Tem acesso aos dados da action que ocassionou no Saga (payload e type)
  const { product } = payload;
  const currentQuantity: number = yield select((state: IState) => {
    return state.cart.items.find(item => item.product.id === product.id)?.quantity || 0;
  });

  // Chamada API, tipagem utiliza AxiosResponse<Tipagem>
  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);

  if(availableStockResponse.data.quantity > currentQuantity) {
    console.log('Há estoque do produto');
    // put: Dispara a ação do Redux
    yield put(addProductToCartSuccess(product));
  } else {
    console.log('Sem estoque do produto');
        // put: Dispara a ação do Redux
        yield put(addProductToCartFailure(product.id));
  }
}

export default all([
  // 1º parâmetro: qual action quero esperar ser disparada p/ executar função do saga
  // 2º parâmetro: a função do saga que executará após essa action for chamada
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)
]);
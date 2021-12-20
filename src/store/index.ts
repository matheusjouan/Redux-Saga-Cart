import { createStore, applyMiddleware } from 'redux';
import { ICartState } from './models/cart/types';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducers from './models/rootReducer';
import rootSaga from './models/rootSaga';

export interface IState {
  cart: ICartState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(rootReducers, composeWithDevTools(
  applyMiddleware(...middlewares)
));

sagaMiddleware.run(rootSaga);

export default store;
import { put, call } from 'redux-saga/effects';
import { increaseOrderItem, fetchOrder } from '../Api/api';
import * as types from '../constants/actionTypes';

export default function* increaseOrderSaga({ payload}) {
  try {
    const localOrderId = localStorage.getItem('orderId');
    const increase = yield call(increaseOrderItem, payload);
    const order = yield call(fetchOrder, localOrderId);
    yield [
      put({ type: types.INCREASE_ORDER_ITEM_SUCCESS, increase }),
      put({ type: types.FETCH_ORDER_SUCCESS, order })
    ];
  } catch (error) {
    yield put({ type: 'INCREASE_ORDER_ITEM_ERROR', error });
  }
}

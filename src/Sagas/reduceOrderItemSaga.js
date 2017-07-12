import { put, call } from 'redux-saga/effects';
import { reduceOrderItem, fetchOrder } from '../Api/api';
import * as types from '../constants/actionTypes';

export default function* reduceOrderSaga({ payload}) {
  try {
    const localOrderId = localStorage.getItem('orderId');
    const reduce = yield call(reduceOrderItem, payload);
    const order = yield call(fetchOrder, localOrderId);
    yield [
      put({ type: types.REDUCE_ORDER_ITEM_SUCCESS, reduce }),
      put({ type: types.FETCH_ORDER_SUCCESS, order })
    ];
  } catch (error) {
    yield put({ type: 'REDUCE_ORDER_ITEM_ERROR', error });
  }
}

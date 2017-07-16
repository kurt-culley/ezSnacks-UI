import { put, call } from 'redux-saga/effects';
import { deleteOrderItem, fetchOrder } from '../Api/api';
import * as types from '../constants/actionTypes';

export default function* deleteOrderSaga({ payload}) {
    try {
        const localOrderId = localStorage.getItem('orderId');
        const del = yield call(deleteOrderItem, payload);
        const order = yield call(fetchOrder, localOrderId);
        yield [
            put({ type: types.DELETE_ORDER_ITEM_SUCCESS, del }),
            put({ type: types.FETCH_ORDER_SUCCESS, order })
        ];
    } catch (error) {
        yield put({ type: 'DELETE_ORDER_ITEM_ERROR', error });
    }
}

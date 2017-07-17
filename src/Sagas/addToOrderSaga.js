import { put, call } from 'redux-saga/effects';
import { addToOrder, fetchOrder } from '../Api/api';
import * as types from '../constants/actionTypes';

export default function* addToOrderSaga({ payload }) {
    try {
        const localOrderId = localStorage.getItem('orderId');
        const add = yield call(addToOrder, payload);
        const order = yield call(fetchOrder, localOrderId);
        yield [
            put({ type: types.ADD_TO_ORDER_SUCCESS, add }),
            put({ type: types.FETCH_ORDER_SUCCESS, order })
        ];
    } catch (error) {
        yield put({ type: 'ADD_TO_ORDER_ERROR', error });
    }
}

import { put, call } from 'redux-saga/effects';
import { fetchOrder } from '../Api/api';
import * as types from '../constants/actionTypes';

export default function* fetchOrderSaga({ payload }) {
    try {
        const order = yield call(fetchOrder, payload);
        yield [
            put({ type: types.FETCH_ORDER_SUCCESS, order })
        ];
    } catch (error) {
        yield put({ type: 'FETCH_ORDER_ERROR', error });
    }
}

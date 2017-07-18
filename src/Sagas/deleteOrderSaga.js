import { put, call } from 'redux-saga/effects';
import { deleteOrder } from '../Api/api';
import * as types from '../constants/actionTypes';

export default function* deleteOrderSaga({ payload }) {
    try {
        const order = yield call(deleteOrder, payload);
        yield [
            put({ type: types.DELETE_ORDER_SUCCESS, order })
        ];
    } catch (error) {
        yield put({ type: 'DELETE_ORDER_ERROR', error });
    }
}

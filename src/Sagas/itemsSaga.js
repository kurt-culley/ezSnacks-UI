import { put, call } from 'redux-saga/effects';
import { fetchItems } from '../Api/api';
import * as types from '../constants/actionTypes';

export default function* fetchItemsSaga({ payload }) {
    try {
        const items = yield call(fetchItems, payload);
        yield [
            put({ type: types.FETCH_ITEMS_SUCCESS, items })
        ];
    } catch (error) {
        yield put({ type: 'FETCH_ITEMS_ERROR', error });
    }
}

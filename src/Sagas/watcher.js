import { takeLatest } from 'redux-saga/effects';
import fetchCategoriesSaga from './categoriesSaga';
import fetchItemsSaga from './itemsSaga';
import fetchOrderSaga from './orderSaga';
import addToOrderSaga from './addToOrderSaga';
import increaseOrderItem from './increaseOrderItemSaga';
import reduceOrderItem from './reduceOrderItemSaga';
import deleteOrderItem from './deleteOrderItemSaga'
import * as types from '../constants/actionTypes';

export function* watchFetchCategories() {
    yield takeLatest(types.FETCH_CATEGORIES_REQUEST, fetchCategoriesSaga);
}

export function* watchFetchItems() {
    yield takeLatest(types.FETCH_ITEMS_REQUEST, fetchItemsSaga);
}

export function* watchFetchOrder() {
    yield takeLatest(types.FETCH_ORDER_REQUEST, fetchOrderSaga);
}

export function* watchAddToOrder() {
    yield takeLatest(types.ADD_TO_ORDER_REQUEST, addToOrderSaga);
}

export function* watchIncreaseOrderItem() {
    yield takeLatest(types.INCREASE_ORDER_ITEM_REQUEST, increaseOrderItem);
}

export function* watchReduceOrderItem() {
    yield takeLatest(types.REDUCE_ORDER_ITEM_REQUEST, reduceOrderItem);
}

export function* watchDeleteOrderItem() {
    yield  takeLatest(types.DELETE_ORDER_ITEM_REQUEST, deleteOrderItem);
}

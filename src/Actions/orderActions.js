import * as types from '../constants/actionTypes';

export const fetchOrderAction = (payload) => ({
  type: types.FETCH_ORDER_REQUEST,
  payload
});

export const addToOrderAction = (payload) => ({
  type: types.ADD_TO_ORDER_REQUEST,
  payload
});

export const increaseOrderItemAction = (payload) => ({
  type: types.INCREASE_ORDER_ITEM_REQUEST,
  payload
});

export const reduceOrderItemAction = (payload) => ({
  type: types.REDUCE_ORDER_ITEM_REQUEST,
  payload
});

export const deleteOrderItemAction = (payload) => ({
  type: types.DELETE_ORDER_ITEM_REQUEST,
  payload
});

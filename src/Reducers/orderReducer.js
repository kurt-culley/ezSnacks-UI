import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (state = initialState.order, action) {
  switch (action.type) {
    case types.FETCH_ORDER_SUCCESS:
      return { ...state, order: action.order };
    default:
      return state;
  }
}

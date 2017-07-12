import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (state = initialState.items, action) {
  switch (action.type) {
    case types.FETCH_ITEMS_SUCCESS:
      return [action.items];
    default:
      return state;
  }
}

import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (state = initialState.categories, action) {
  switch (action.type) {
    case types.FETCH_CATEGORIES_SUCCESS:
      return [...state, action.categories];
    default:
      return state;
  }
}

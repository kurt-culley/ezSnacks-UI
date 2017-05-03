import { FETCH_ITEMS, FETCH_ITEM } from '../actions/item_actions';

const INITIAL_STATE = { all: [], item: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {

    case FETCH_ITEM:
      return { ...state, item: action.payload.data };

    case FETCH_ITEMS:
      return { ...state, all: action.payload.data };

    default:
      return state;
  }
}

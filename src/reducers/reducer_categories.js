import { FETCH_CATEGORIES, FETCH_CATEGORY } from '../actions/index';

const INITIAL_STATE = { all: [], category: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {

    case FETCH_CATEGORY:
      return { ...state, category: action.payload.data };

    case FETCH_CATEGORIES:
      return { ...state, all: action.payload.data };

    default:
      return state;
  }
}

import * as types from '../constants/actionTypes';

export const fetchItemsAction = (payload) => ({
    type: types.FETCH_ITEMS_REQUEST,
    payload
});

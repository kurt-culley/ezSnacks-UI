import * as types from '../constants/actionTypes';

export const fetchCategoriesAction = (payload) => ({
    type: types.FETCH_CATEGORIES_REQUEST,
    payload
});
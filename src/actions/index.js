import axios from 'axios';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const CREATE_ITEM = 'CREATE_ITEM';

const ROOT_URL = 'http://127.0.0.1:3000/restaurants/1'

export function fetchCategories() {
  const request = axios.get(`${ROOT_URL}/menu_categories`);

  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}

export function createCategory(props) {
  const request = axios.post(`${ROOT_URL}/menu_categories`, props);

  return {
    type: CREATE_CATEGORY,
    payload: request
  };
}

export function fetchCategory(id) {
  const request = axios.get(`${ROOT_URL}/menu_categories/${id}`);

  return {
    type: FETCH_CATEGORY,
    payload: request
  };
}

export function deleteCategory(id) {
  const request = axios.delete(`${ROOT_URL}/menu_categories/${id}`);

  return {
    type: DELETE_CATEGORY,
    payload: request
  };
}

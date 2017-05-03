import axios from 'axios';

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const CREATE_ITEM = 'CREATE_ITEM';

const ROOT_URL = 'http://127.0.0.1:3000/restaurants/1'


export function fetchItems(id) {
  const request = axios.get(`${ROOT_URL}/menu_categories/${id}/menu_items`);

  return {
    type: FETCH_ITEMS,
    payload: request
  };
}

export function createItem(id, props) {
  const request = axios.post(`${ROOT_URL}/menu_categories/${id}/menu_items`, props);

  return {
    type: CREATE_ITEM,
    payload: request
  };
}

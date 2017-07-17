import axios from 'axios';

const ROOT_URL = 'https://enigmatic-island-60050.herokuapp.com/restaurants';

export const fetchCategories = () => {
    const URI = `${ROOT_URL}/${localStorage.getItem('restaurantId')}/menu_categories`;

    return fetch(URI)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json.map(({ id, name, image_url }) => ({
                id,
                name,
                image_url
            }));
        });
};

export const fetchItems = (categoryId) => {
    const URI = `${ROOT_URL}/${localStorage.getItem('restaurantId')}/menu_categories/${categoryId}/menu_items`;

    return fetch(URI)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json.map(({ description, id, image_url, name, price }) => ({
                description,
                id,
                image_url,
                name,
                price
            }));
        });
};

export const fetchOrder = (orderId) => {
    const URI = `${ROOT_URL}/${localStorage.getItem('restaurantId')}/orders/${orderId}`;

    return fetch(URI)
        .then(response => {
            return response.json();
        });
};

export const addToOrder = (itemId) => {
    const URI = `${ROOT_URL}/${localStorage.getItem('restaurantId')}/orders/${localStorage.getItem('orderId')}/items`;
    return axios.post(URI, { menu_item_id: itemId });
};

export const deleteOrderItem = (itemId) => {
    const URI = `${ROOT_URL}/${localStorage.getItem('restaurantId')}/orders/${localStorage.getItem('orderId')}/items/${itemId}`;
    return axios.delete(URI, { menu_item_id: itemId });
};

export const increaseOrderItem = (itemId) => {
    const URI = `${ROOT_URL}/${localStorage.getItem('restaurantId')}/orders/${localStorage.getItem('orderId')}/items/${itemId}/add`;
    return axios.post(URI);
};

export const reduceOrderItem = (itemId) => {
    const URI = `${ROOT_URL}/${localStorage.getItem('restaurantId')}/orders/${localStorage.getItem('orderId')}/items/${itemId}/reduce`;
    return axios.post(URI);
};

export const createOrder = (restaurantId, tableId) => {
    axios.post(`${ROOT_URL}/${restaurantId}/orders`, { table_id: tableId })
        .then(function (response) {
            localStorage.setItem("orderId", response.data.id);
            localStorage.setItem("restaurantId", restaurantId);
        });
};

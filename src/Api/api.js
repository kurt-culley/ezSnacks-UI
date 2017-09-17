import axios from 'axios';

const ROOT_URL = 'https://ancient-tundra-28811.herokuapp.com';


// Menu Categories
export const fetchCategories = () => {
    const URI = `${ROOT_URL}/restaurants/${localStorage.getItem('restaurantId')}/menu_categories`;
    return fetch(URI)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json.map(({id, name, image_url}) => ({
                id,
                name,
                image_url
            }));
        });
};

export const createCategory = (payload) => {
    const URI = `${ROOT_URL}/restaurants/${localStorage.getItem('restaurantId')}/menu_categories`;
    return axios.post(URI, {name: payload.name, image_url: payload.image});
};

export const updateCategory = (payload, categoryId) => {
    const URI = `${ROOT_URL}/menu_categories/${categoryId}`;
    return axios.patch(URI, {name: payload.name, image_url: payload.image});
};

export const deleteCategory = (categoryId) => {
    const URI = `${ROOT_URL}/menu_categories/${categoryId}`;
    return axios.delete(URI);
};


// Menu Items
export const fetchItems = (categoryId) => {
    const URI = `${ROOT_URL}/menu_categories/${categoryId}/menu_items`;
    return fetch(URI)
        .then(response => {
            return response.json();
        }).then(json => {
            return json.map(({description, id, image_url, name, price}) => ({
                description,
                id,
                image_url,
                name,
                price
            }));
        });
};


export const createItem = (payload, categoryId) => {
    const URI = `${ROOT_URL}/menu_categories/${categoryId}/menu_items`;
    return axios.post(URI, {
        name: payload.name, image_url: payload.image,
        price: payload.price, description: payload.description
    });
};

export const updateItem = (payload, itemId) => {
    const URI = `${ROOT_URL}/menu_items/${itemId}`;
    return axios.put(URI, {
        name: payload.name, image_url: payload.image,
        price: payload.price, description: payload.description
    });
};

export const deleteItem = (itemId) => {
    const URI = `${ROOT_URL}/menu_items/${itemId}`;
    return axios.delete(URI);
};


// Orders
export const fetchOrder = (orderId) => {
    const URI = `${ROOT_URL}/orders/${orderId}`;
    return fetch(URI)
        .then(response => {
            return response.json();
        }).then(json => {
            return json;
        });
};

export const fetchOrders = (restaurantId) => {
    const URI = `${ROOT_URL}/restaurants/${restaurantId}/orders`;
    return fetch(URI)
        .then(response => {
            return response.json();
        }).then(json => {
            return json;
        });
};

export const createOrder = (restaurantId, tableId) => {
    return axios.post(`${ROOT_URL}/tables/${tableId}/orders`)
        .then(function (response) {
            localStorage.setItem("orderId", response.data.id);
            localStorage.setItem("restaurantId", restaurantId);
        });
};

export const checkoutOrder = (nonce) => {
    const URI = `${ROOT_URL}/orders/${localStorage.getItem('orderId')}/payment`;
    return axios.post(URI, {payment_method_nonce: nonce});
};


export const deleteOrder = (orderId) => {
    const URI = `${ROOT_URL}/orders/${orderId}`;
    return axios.delete(URI).then(localStorage.clear());
};

export const updateOrder = (orderId, payload) => {
    const URI = `${ROOT_URL}/orders/${orderId}`;
    return axios.patch(URI, {status: payload});
};


//Order Item
export const addToOrder = (itemId) => {
    const URI = `${ROOT_URL}/orders/${localStorage.getItem('orderId')}/items`;
    return axios.post(URI, {menu_item_id: itemId});
};

export const deleteOrderItem = (itemId) => {
    const URI = `${ROOT_URL}/orders/${localStorage.getItem('orderId')}/items/${itemId}`;
    return axios.delete(URI);
};

export const increaseOrderItem = (itemId) => {
    const URI = `${ROOT_URL}/orders/${localStorage.getItem('orderId')}/items/${itemId}/add`;
    return axios.post(URI);
};

export const reduceOrderItem = (itemId) => {
    const URI = `${ROOT_URL}/orders/${localStorage.getItem('orderId')}/items/${itemId}/reduce`;
    return axios.post(URI);
};

export const updateOrderItem = (orderId, itemId, payload) => {
    const URI = `${ROOT_URL}/orders/${orderId}/items/${itemId}`;
    return axios.patch(URI, {status: payload});
};


// Payments
export const getPaymentToken = () => {
    const URI = `${ROOT_URL}/orders/${localStorage.getItem('orderId')}/payment/client_token`;
    return fetch(URI)
        .then( response => {
            return response.json();
        }).then(json => {
            return json.client_token;
        });
};

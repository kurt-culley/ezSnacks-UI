import { combineReducers } from 'redux';
import CategoriesReducer from './categoriesReducer';
import ItemsReducer from './itemsReducer';
import OrderReducer from './orderReducer';

const rootReducer = combineReducers({
    categories: CategoriesReducer,
    items: ItemsReducer,
    order: OrderReducer
});

export default rootReducer;

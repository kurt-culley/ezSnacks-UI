import { combineReducers } from 'redux';
import CategoriesReducer from './categoriesReducer';
import ItemsReducer from './itemsReducer';
import OrderReducer from './orderReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    categories: CategoriesReducer,
    items: ItemsReducer,
    order: OrderReducer,
    form: formReducer
});

export default rootReducer;

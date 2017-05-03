import { combineReducers } from 'redux';
import CategoriesReducer from './reducer_categories';
import ItemsReducer from './reducer_items';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  categories: CategoriesReducer,
  items: ItemsReducer,
  form: formReducer
});

export default rootReducer;

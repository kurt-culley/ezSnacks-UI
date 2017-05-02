import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import CategoriesIndex from './components/categories_index';
import CategoriesNew from './components/categories_new';
import CategoriesShow from './components/categories_show';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={CategoriesIndex} />
    <Route path="categories/new" component={CategoriesNew} />
    <Route path="categories/:id" component={CategoriesShow} />
  </Route>
);

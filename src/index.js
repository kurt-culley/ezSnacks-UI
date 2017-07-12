import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import CategoriesIndex from './components/categoriesIndex';
import ItemsIndex from './components/itemsIndex';
import OrderContainer from './components/orderContainer';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <OrderContainer />
        <Switch>
          <Route path="/categories/:id/items" component={ItemsIndex} />
          <Route path="/categories" component={CategoriesIndex} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));

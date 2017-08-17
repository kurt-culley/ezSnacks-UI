import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CategoriesIndex from './components/categoriesIndex';
import ItemsIndex from './components/itemsIndex';
import AdminOrderTracker from './components/orderTrackerAdmin';
import OrderTracker from './components/orderTracker';
import Home from './components/home';
import AdminHome from './components/adminHome';
import Login from './components/login';
import OrderContainer from './components/orderContainer';
import OrderNew from './components/orderNew';

import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <OrderContainer/>
                <switch>
                    <Route path="/order/new" component={OrderNew} />
                    <Route path="/order/tracker" component={OrderTracker} />
                </switch>
                <switch>
                    <Route path="/admin/login" component={Login} />
                    <Route path="/admin/tracker" component={AdminOrderTracker} />
                    <Route path="/admin" component={AdminHome} />
                </switch>
                <Switch>
                    <Route path="/categories/:id/items" component={ItemsIndex} />
                    <Route path="/categories" component={CategoriesIndex} />
                </Switch>
                <Route exact path="/" component={Home} />
            </div>
        </BrowserRouter>
    </Provider>
, document.querySelector('.app'));

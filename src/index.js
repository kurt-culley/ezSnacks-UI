import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CategoriesIndex from './Components/Categories/categoriesIndex';
import ItemsIndex from './Components/Items/itemsIndex';
import AdminOrderTracker from './Components/Order/orderTrackerAdmin';
import OrderTracker from './Components/Order/orderTracker';
import Home from './components/home';
import AdminHome from './Components/Admin/adminHome';
import Login from './Components/Admin/login';
import OrderContainer from './Components/Order/orderContainer';
import OrderNew from './Components/Order/orderNew';
import CategoriesManage from './Components/Categories/categoriesManage';
import ItemsManage from './Components/Items/itemsManage';
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
                    <Route path="/categories/:id/items/manage" component={ItemsManage} />
                    <Route path="/categories/:id/items" component={ItemsIndex} />
                    <Route path="/categories/manage" component={CategoriesManage} />
                    <Route path="/categories" component={CategoriesIndex} />
                </Switch>
                <Route exact path="/" component={Home} />
            </div>
        </BrowserRouter>
    </Provider>
, document.querySelector('.app'));

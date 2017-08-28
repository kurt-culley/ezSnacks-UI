import React, {Component} from 'react';
import {browserHistory, withRouter, Link} from 'react-router-dom';
import {Glyphicon} from 'react-bootstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <div className="home-body">
                    <div className="home-header">
                        <h1>ezSnacks</h1>
                        <h3>Home</h3>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-6 col-xs-offset-3">
                                <ul className="list-group menu-list">
                                    <li className="list-group-item home-list-item">
                                        <Link to='/categories'>
                                            <h4>Menu</h4>
                                            <Glyphicon
                                                glyph="glyphicon glyphicon-th-list home-glyph vcenter"/>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-xs-6 col-xs-offset-3">
                                <ul className="list-group menu-list">
                                    <li className="list-group-item home-list-item">
                                        { localStorage.orderId ?
                                            <Link to='/order/tracker'>
                                                <h4>Order Tracker</h4>
                                                <Glyphicon
                                                    glyph="glyphicon glyphicon-time home-glyph vcenter"/>
                                            </Link> :
                                            <Link to='/order/new'>
                                                <h4>Order</h4>
                                                <Glyphicon
                                                    glyph="glyphicon glyphicon-qrcode home-glyph vcenter"/>
                                            </Link> }
                                    </li>
                                </ul>
                            </div>
                            <div className="col-xs-6 col-xs-offset-3">
                                <ul className="list-group menu-list">
                                    <li className="list-group-item home-list-item">
                                        <Link to='/admin/login'>
                                            <h4>Admin</h4>
                                            <Glyphicon
                                                glyph="glyphicon glyphicon-wrench home-glyph vcenter"/>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
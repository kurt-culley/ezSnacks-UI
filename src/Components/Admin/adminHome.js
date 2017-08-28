import React, {Component} from 'react';
import {browserHistory, withRouter, Link} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Glyphicon} from 'react-bootstrap';

class AdminHome extends Component {
    render() {
        return (
            <div>
                <div className="home-body">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="home-header">
                                <h3>Admin Home</h3>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-xs-6 col-xs-offset-3">
                                        <ul className="list-group menu-list">
                                            <li className="list-group-item home-list-item">
                                                <Link to='/categories/manage'>
                                                    <h4>Manage menus</h4>
                                                    <Glyphicon
                                                        glyph="glyphicon glyphicon-wrench home-glyph vcenter"/>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-xs-6 col-xs-offset-3">
                                        <ul className="list-group menu-list">
                                            <li className="list-group-item home-list-item">
                                                <Link to='/order/tracker'>
                                                    <h4>Orders tracker</h4>
                                                    <Glyphicon
                                                        glyph="glyphicon glyphicon-time home-glyph vcenter"/>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-xs-6 col-xs-offset-3">
                                        <ul className="list-group menu-list">
                                            <li className="list-group-item home-list-item">
                                                <Link to='/admin/login'>
                                                    <h4>Stats</h4>
                                                    <Glyphicon
                                                        glyph="glyphicon glyphicon-stats home-glyph vcenter"/>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminHome;
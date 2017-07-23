import React, { Component } from 'react';
import {ProgressBar} from 'react-bootstrap';

class OrderTracker extends Component {

    renderItems() {
        return this.props.order.order_items.map((item) => {
            return (
                <li
                    className="list-group-item"
                    key={item.id}>
                    <div className="row-">
                        <div className="col-xs-4 col-sm-2 vcenter">
                            <img src={item.menu_item.image_url} />
                        </div>
                        <div className="col-xs-4 col-sm-6 vcenter">
                            <h4 onClick={() => this.handleClick(item.id)}>
                                {item.menu_item.name}
                            </h4>
                            <small>{item.menu_item.description}</small>
                        </div>
                        <div className="col-xs-4 col-sm-4 vcenter">
                            <h4><span className="label label-danger">In Progress</span></h4>
                        </div>
                    </div>
                </li>
            )
        })
    }

    render() {
        const now = 60;
        return (
            <div>
                <h3 className="menu-header">Order Tracker</h3>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <ProgressBar now={now} label={`${now}%`} />
                    </div>
                </div>
                <ul className="list-group menu-list">
                    {this.renderItems()}
                </ul>
            </div>
        )
    }
}

export default OrderTracker;

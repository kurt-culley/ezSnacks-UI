import React, {Component} from 'react';
import {ProgressBar, Button} from 'react-bootstrap';
import {browserHistory, withRouter} from 'react-router-dom';
import {Glyphicon, Badge} from 'react-bootstrap';
import {updateOrderItem, updateOrder} from '../../Api/api';

class orderTrackerDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: null
        };
    }

    handleSetOrderStatus(orderId, status) {
        updateOrder(orderId, status).then(() => {
            window.location.reload();
        });
    }


    handleSetItemStatus(itemId, status){
        updateOrderItem(this.props.order.id, itemId, status).then(() => {
            window.location.reload();
        });
    }

    renderItems() {
        if (!this.props.order) {
            return <div></div>
        }

        return this.props.order.order_items.map((order_item) => {
            return (
            <li
                className="list-group-item"
                key={order_item.id}>
                <div className="media">
                    <div className="media-body">
                        <div className="media-heading">
                            <h4>{order_item.menu_item.name}
                                 <small>{order_item.menu_item.description}</small>
                            </h4>
                        </div>
                        <div className="row">
                            <div className="col-xs-4 col-sm-4">
                                <div>
                                    Each: £{order_item.menu_item.price}
                                    <br />
                                    Quantity: {order_item.quantity}
                                    <br />
                                    Total: £{order_item.total_price}
                                    <br />
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-4">
                                <h4 className="centred-label"><span className={order_item.status === 'complete' ? 'label label-success' : 'label label-danger'}>{order_item.status}</span></h4>
                            </div>
                            <div className="col-xs-4 col-sm-4">
                                { order_item.status === 'in_progress' ?
                                    <div className="col-xs-6 col-xs-offset-3">
                                        <button onClick={() => this.handleSetItemStatus(order_item.id, 'complete')}
                                                className="btn btn-success order-item-quantity-btn">
                                            <Glyphicon glyph="glyphicon glyphicon-ok"/>
                                        </button>
                                    </div> :
                                    <div className="col-xs-6 col-xs-offset-3">
                                        <button onClick={() => this.handleSetItemStatus(order_item.id, 'in_progress')}
                                                className="btn btn-danger order-item-quantity-btn">
                                            <Glyphicon glyph="glyphicon glyphicon-remove"/>
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            )
        });
    }


    render() {
        return (
            <div className="panel panel-default panel-detail">
                <div className="panel-body">
                    <li className="list-group-item">
                        <div className="media">
                            <div className="media-heading">
                                <h4>Order {this.props.order.id}
                                    <small>Table {this.props.order.table_id}</small>
                                </h4>
                            </div>
                            <div className="media-body">
                                <div className="row">
                                    <div className="col-xs-4 col-sm-4">
                                        <div>
                                            <h4 className="centred-label"><span className={this.props.order.status === 'complete' ? 'label label-success' : 'label label-danger'}>{this.props.order.status}</span></h4>
                                        </div>
                                    </div>
                                    <div className="col-xs-8 col-sm-4">
                                        <div className="col-xs-4">
                                            <button onClick={() => this.handleSetOrderStatus(this.props.order.id, 'pending_payment')}
                                                    className="btn btn-danger order-item-quantity-btn">
                                                <Glyphicon glyph="glyphicon glyphicon-remove"/>
                                            </button>
                                        </div>
                                        <div className="col-xs-4">
                                            <button onClick={() => this.handleSetOrderStatus(this.props.order.id, 'in_progress')}
                                                    className="btn btn-warning order-item-quantity-btn">
                                                <Glyphicon glyph="glyphicon glyphicon-refresh"/>
                                            </button>
                                        </div>
                                        <div className="col-xs-4">
                                            <button onClick={() => this.handleSetOrderStatus(this.props.order.id, 'complete')}
                                                    className="btn btn-success order-item-quantity-btn">
                                                <Glyphicon glyph="glyphicon glyphicon-ok"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    {this.renderItems()}
                </div>
            </div>
        )
    }
}


export default withRouter(orderTrackerDetail);

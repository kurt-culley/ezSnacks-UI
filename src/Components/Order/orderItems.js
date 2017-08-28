import React, {Component} from 'react';
import {connect} from 'react-redux';
import {increaseOrderItemAction, reduceOrderItemAction, deleteOrderItemAction} from '../../Actions/orderActions';
import {Glyphicon, Badge} from 'react-bootstrap';

class OrderItems extends Component {

    handleReduceClick(itemId) {
        this.props.dispatch(reduceOrderItemAction(itemId));
    }

    handleIncreaseClick(itemId) {
        this.props.dispatch(increaseOrderItemAction(itemId));
    }

    handleDeleteClick(itemId) {
        this.props.dispatch(deleteOrderItemAction(itemId));
    }

    renderItems() {
        return this.props.items.map((order_item) => {
            return (
                <li
                    className="list-group-item"
                    key={order_item.menu_item.id}>
                    <div className="media">
                        <div className="media-body">
                            <div className="media-heading">
                                <h4>{order_item.menu_item.name}
                                    <small>{order_item.menu_item.description}</small>
                                </h4>
                            </div>
                            <div className="row">
                                <div className="col-xs-5 col-sm-8">
                                    <div>
                                        Each: £{order_item.menu_item.price}
                                        <br />
                                        Quantity: {order_item.quantity}
                                        <br />
                                        Total: £{order_item.total_price}
                                    </div>
                                </div>
                                <div className="col-xs-7 col-sm-4">
                                    <div className="row">
                                        <div className="col-xs-4 order-btn-div">
                                            <button onClick={() => this.handleReduceClick(order_item.id)}
                                                    className="btn btn-default order-item-quantity-btn">
                                                <Glyphicon glyph="glyphicon glyphicon-minus"/>
                                            </button>
                                        </div>
                                        <div className="col-xs-4 order-btn-div">
                                            <button onClick={() => this.handleIncreaseClick(order_item.id)}
                                                    className="btn btn-default order-item-quantity-btn">
                                                <Glyphicon glyph="glyphicon glyphicon-plus"/>
                                            </button>
                                        </div>
                                        <div className="col-xs-4 order-btn-div">
                                            <button onClick={() => this.handleDeleteClick(order_item.id)}
                                                    className="btn btn-danger order-item-quantity-btn">
                                                <Glyphicon glyph="glyphicon glyphicon glyphicon-trash"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            )
        })
    }

    render() {
        return (
            <div>
                <ul className="list-group">
                    {this.renderItems()}
                </ul>
            </div>
        );
    }
}

export default connect()(OrderItems);

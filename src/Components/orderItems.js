import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increaseOrderItemAction } from '../actions/orderActions';
import { reduceOrderItemAction } from '../actions/orderActions';
import { Glyphicon } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';

class OrderItems extends Component {

  handleReduceClick(itemId){
    this.props.dispatch(reduceOrderItemAction(itemId))
  }

  handleIncreaseClick(itemId){
    this.props.dispatch(increaseOrderItemAction(itemId))
  }

  renderItems() {

    return this.props.items.order_items.map((order_item) => {

      return (
        <li
          className="list-group-item"
          key={order_item.menu_item.id}>
          <div className="media">
            <div className="media-body">
              <h4 className="media-heading order-header">{order_item.menu_item.name} - {order_item.menu_item.description}</h4>
              <div className="row">
                <div className="col-xs-5">
                  <div className="order-item-text">
                    Each: £{order_item.menu_item.price}
                    <br />
                    Total: £{order_item.total_price}
                    <br />
                    Quantity: {order_item.quantity}
                  </div>
                </div>
                <div className="col-xs-7">
                  <div className="row">
                    <div className="col-xs-4 order-btn-div">
                      <button onClick={() => this.handleReduceClick(order_item.id)} className="btn btn-default order-item-quantity-btn">
                        <Glyphicon glyph="glyphicon glyphicon-minus" />
                      </button>
                    </div>
                    <div className="col-xs-4 order-btn-div">
                      <button onClick={() => this.handleIncreaseClick(order_item.id)} className="btn btn-default order-item-quantity-btn">
                        <Glyphicon glyph="glyphicon glyphicon-plus" />
                      </button>
                    </div>
                    <div className="col-xs-4 order-btn-div">
                      <button onClick={() => this.handleReduceClick(order_item.id)} className="btn btn-danger order-item-quantity-btn">
                        <Glyphicon glyph="glyphicon glyphicon glyphicon-trash" />
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

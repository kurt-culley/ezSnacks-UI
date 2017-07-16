import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderItems from './orderItems';
import { fetchOrderAction } from '../actions/orderActions';

class Order extends Component {

  componentDidMount() {
    this.props.dispatch(fetchOrderAction(this.props.orderId));
  }

  render() {
    if (!this.props.order) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <OrderItems items={this.props.order.order} />
        <div>
          <strong>Total: £{this.props.order.order.sub_total}</strong>
        </div>
      </div>
    );
  }

}

const mapStateToProps = ({ order }) => ({
  order: order
});


export default connect(mapStateToProps)(Order);

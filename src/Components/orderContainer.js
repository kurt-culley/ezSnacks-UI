import React, { Component } from 'react';
import { Modal, Button, Glyphicon } from 'react-bootstrap';
import { browserHistory, withRouter } from 'react-router-dom';
import { fetchOrderAction } from '../actions/orderActions';
import { connect } from 'react-redux';
import OrderItems from './orderItems';

class OrderContainer extends Component {

    constructor() {
        super();
        this.state = {
            showModal: false,
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
        if (localStorage.orderId) {
            this.props.dispatch(fetchOrderAction(localStorage.getItem("orderId")));
            this.props.history.push("/categories");
        }
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    render() {
        if (!this.props.order) {
            return <div>Loading Order...</div>;
        }

        return (
            <div>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                    className="order-btn"
                >
                    <Glyphicon glyph="glyphicon glyphicon-shopping-cart" />
                    <span className="order-badge">{this.props.order.order.order_items.length}</span>
                </Button>
                <div>
                    <div>
                        <Modal show={this.state.showModal} onHide={this.close}>
                            <Modal.Header closeButton>
                                <Modal.Title className="order-header">Order</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <OrderItems items={this.props.order.order.order_items} />
                            </Modal.Body>
                            <Modal.Footer>
                                <div>
                                    <div className="row">
                                        <div className="col-xs-4">
                                            <Button className="pull-left btn-danger cancel-btn" onClick={this.close}>Cancel</Button>
                                        </div>
                                        <div className="col-xs-4 text-center">
                                            <Button className="btn-success checkout-btn" onClick={this.close}>Checkout</Button>
                                        </div>
                                        <div className="col-xs-4">
                                            <Button className="pull-right close-btn" onClick={this.close}>Close</Button>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ order }) => ({
    order: order
});

export default withRouter(connect(mapStateToProps)(OrderContainer));

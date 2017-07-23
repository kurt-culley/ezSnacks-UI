import React, {Component} from 'react';
import {Modal, Button, Glyphicon} from 'react-bootstrap';
import {browserHistory, withRouter} from 'react-router-dom';
import {deleteOrderAction} from '../actions/orderActions';
import {connect} from 'react-redux';
import OrderItems from './orderItems';
import Checkout from './checkout';

class OrderContainer extends Component {

    constructor() {
        super();
        this.state = {
            showModal: false,
            showCheckout: false,
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCancelOrder = this.handleCancelOrder.bind(this);
        this.handleCheckoutOrder = this.handleCheckoutOrder.bind(this);
    }

    componentDidMount() {
        this.props.history.push("/categories");
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCancelOrder() {
        this.props.dispatch(deleteOrderAction(localStorage.getItem("orderId")));
        this.handleCloseModal();
        this.props.history.push("/");
        window.location.reload();
    }

    handleCheckoutOrder() {
        if (this.state.showCheckout === false) {
            this.setState({showCheckout: true});
        } else {
            this.setState({showCheckout: false});
        }
    }


    render() {
        if (!this.props.order) {
            return <div></div>;
        }

        return (
            <div>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.handleOpenModal}
                    className="order-btn"
                >
                    <Glyphicon glyph="glyphicon glyphicon-shopping-cart"/>
                    <span className="order-badge">{this.props.order.order_items.length}</span>
                </Button>
                <div>
                    <div>
                        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title className="order-header">Order</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <OrderItems items={this.props.order.order_items}/>
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <h4>Total: £{this.props.order.sub_total} </h4>
                                    </div>
                                </div>
                                { this.state.showCheckout ? <Checkout/> : null }
                            </Modal.Body>
                            <Modal.Footer>
                                <div>
                                    <div className="row">
                                        <div className="col-xs-4">
                                            <Button
                                                className="pull-left btn-danger cancel-btn"
                                                onClick={() => {
                                                    if (confirm('Are you sure you would like to cancel your order?')) {
                                                        this.handleCancelOrder()
                                                    }
                                                }}>
                                                Cancel
                                            </Button>
                                        </div>
                                        <div className="col-xs-4 text-center">
                                            <Button
                                                className="btn-success checkout-btn"
                                                onClick={() => this.handleCheckoutOrder()}>
                                                Checkout
                                            </Button>
                                        </div>
                                        <div className="col-xs-4">
                                            <Button
                                                className="pull-right close-btn"
                                                onClick={this.handleCloseModal}>
                                                Close
                                            </Button>
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

export default withRouter(connect()(OrderContainer));

import React, {Component} from 'react';
import {Modal, Button, Glyphicon} from 'react-bootstrap';
import {browserHistory, withRouter} from 'react-router-dom';
import {fetchOrderAction, deleteOrderAction} from '../actions/orderActions';
import {connect} from 'react-redux';
import OrderItems from './orderItems';

class OrderContainer extends Component {

    constructor() {
        super();
        this.state = {
            showModal: false,
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCancelOrder = this.handleCancelOrder.bind(this);
        this.handleCheckoutOrder = this.handleCheckoutOrder.bind(this);
    }

    componentWillMount() {
        if (localStorage.orderId) {
            this.props.dispatch(fetchOrderAction(localStorage.getItem("orderId")));
            this.props.history.push("/categories");
        }
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
                    <span className="order-badge">{this.props.order.order.order_items.length}</span>
                </Button>
                <div>
                    <div>
                        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title className="order-header">Order</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <OrderItems items={this.props.order.order.order_items}/>
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
                                                onClick={this.handleCheckoutOrder()}>
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

const mapStateToProps = ({order}) => ({
    order: order
});

export default withRouter(connect(mapStateToProps)(OrderContainer));

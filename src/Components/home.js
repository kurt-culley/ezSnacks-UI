import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOrderAction} from '../actions/orderActions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {browserHistory, withRouter} from 'react-router-dom';
import OrderContainer from './orderContainer';
import Qrcode from './qrcode';
import OrderTracker from './orderTracker';

class Home extends Component {

    componentDidMount() {
        if (localStorage.orderId && localStorage.restaurantId) {
            this.props.dispatch(fetchOrderAction(localStorage.getItem("orderId")));
        }
    }

    renderCheck() {
        if (!localStorage.orderId && !localStorage.restaurantId) {
            return (
                <Qrcode/>
            )
        }

        if (this.props.order) {
            if (this.props.order.order.status === 'pending_payment') {
                return (
                    <OrderContainer order={this.props.order.order}/>
                )
            } else {
                return (
                    <OrderTracker order={this.props.order.order}/>
                )
            }
        }
    }

    render() {
        return (
            <div>
                <ReactCSSTransitionGroup
                    transitionName="menu"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        { this.renderCheck() }
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = ({order}) => ({
    order: order
});

export default withRouter(connect(mapStateToProps)(Home));

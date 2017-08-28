import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOrderAction} from '../../Actions/orderActions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {browserHistory, withRouter} from 'react-router-dom';
import OrderModal from './orderModal';

class OrderContainer extends Component {

    componentDidMount() {
        if (localStorage.orderId && localStorage.restaurantId) {
            this.props.dispatch(fetchOrderAction(localStorage.getItem("orderId")));
        }
    }

    statusCheck() {
        if (this.props.order) {
            if (this.props.order.status === 'pending_payment') {
                return (
                    <OrderModal order={this.props.order}/>
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
                        { this.statusCheck() }
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = ({order}) => ({
    order: order
});

export default withRouter(connect(mapStateToProps)(OrderContainer));

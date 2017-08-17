import React, {Component} from 'react';
import {ProgressBar, Button} from 'react-bootstrap';
import {browserHistory, withRouter} from 'react-router-dom';
import {fetchOrderAction} from '../actions/orderActions';
import {connect} from 'react-redux';

class OrderTrackerAdmin extends Component {

    componentWillMount() {
        if (localStorage.orderId && localStorage.restaurantId) {
            this.props.dispatch(fetchOrderAction(localStorage.getItem("orderId")));
            setInterval(function () {
                window.location.reload()
            }, 30000);
        } else {
            this.props.history.push("/");
        }
    }

    renderItems() {
        return this.props.order.order_items.map((item) => {
            return (
                <li
                    className="list-group-item"
                    key={item.id}>
                    <div className="row-">
                        <div className="col-xs-4 col-sm-2 vcenter">
                            <img src={item.menu_item.image_url}/>
                        </div>
                        <div className="col-xs-4 col-sm-6 vcenter">
                            <h4>{item.menu_item.name}</h4>
                            <small>{item.menu_item.description}</small>
                            <br />
                            <small>Quantity: {item.quantity}</small>
                        </div>
                        <div className="col-xs-4 col-sm-4 vcenter">
                            <h4>
                                <span
                                    className={item.status === 'complete' ?
                                        'label label-success' : ' label label-danger'}> {item.status}
                                </span>
                            </h4>
                        </div>
                    </div>
                </li>
            )
        })
    }

    calcPercentage() {
        let num_items = this.props.order.order_items.length * 10;
        let num_complete = 0;
        this.props.order.order_items.forEach(function (item) {
            item.status === 'complete' ? num_complete += 10 : null
        });
        return Math.floor((num_complete / num_items) * 100);
    }


    render() {
        if (!this.props.order) {
            return <div>Loading...</div>;
        }
        let percentage = this.calcPercentage();
        return (
            <div className="container">
                <h3 className="menu-header">Order Tracker</h3>
                <div className="panel panel-default">
                    <div className="panel-body tracker-panel">
                        <ProgressBar bsStyle="success" active now={percentage} label={`${percentage}%`}/>
                        { percentage === 100 ?
                            <div className="order-tracker-btn">
                                <Button
                                    className="btn-block btn-success"
                                    onClick={() => {
                                        if (confirm('Are you sure?')) {
                                            this.handleNewOrder();
                                        }
                                    }}>
                                    New Order
                                </Button>
                            </div> : null
                        }
                    </div>
                </div>

                <ul className="list-group menu-list">
                    {this.renderItems()}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({order}) => ({
    order: order
});

export default withRouter(connect(mapStateToProps)(OrderTrackerAdmin));

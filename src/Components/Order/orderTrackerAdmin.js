import React, {Component} from 'react';
import {ProgressBar, Button} from 'react-bootstrap';
import {browserHistory, withRouter} from 'react-router-dom';
import {fetchOrders} from '../../Api/api';
import OrderTrackerDetail from './orderTrackerDetail';
import {Glyphicon, Badge} from 'react-bootstrap';

class OrderTrackerAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            order: null,
            statusFilter: '',
            showDetail: false,
        };
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    componentWillMount() {
        fetchOrders(localStorage.restaurantId).then(response => {
            const orders = response.map(obj => obj);
            this.setState({orders});
        });
    }

    handleOpenOrderDetail(order) {
        if (!this.state.showDetail) {
            this.setState({showDetail: true, order: order})
        } else {
            this.setState({showDetail: false, order: null})
        }
    }

    handleFilterChange(event) {
        const value = event.target.value;

        this.setState({
            statusFilter: value
        });
    }

    renderRows() {
        if (!this.state.orders) {
            return <div></div>;
        }

        return this.state.orders.map((order) => {
            if (order.status === this.state.statusFilter) {
                return (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.table_id}</td>
                        <td>{order.status}</td>
                        <td>£{order.sub_total}</td>
                        <td>
                            <button onClick={() => this.handleOpenOrderDetail(order)}
                                    className="btn btn-success">
                                <Glyphicon glyph="glyphicon glyphicon-wrench"/>
                            </button>
                        </td>
                    </tr>
                )
            }
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 col-lg-4" />
                    <div className="col-xs-12 col-md-8 col-lg-4">
                        <h3 className="menu-header">Orders Tracker</h3>
                        <form className="form-horizontal">
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <select
                                        className="form-control"
                                        onChange={this.handleFilterChange}>
                                        <option>Select filter</option>
                                        <option value="in_progress">In progress</option>
                                        <option value="complete">Complete</option>
                                        <option value="pending_payment">Pending payment</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <div className="panel panel-default">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Table</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.renderRows()}
                                </tbody>
                            </table>
                        </div>
                        { this.state.showDetail ? <OrderTrackerDetail order={this.state.order}/> : <div></div>}
                    </div>
                    <div className="col-md-2 col-lg-4" />
                </div>
            </div>
        )
    }
}

export default withRouter(OrderTrackerAdmin);

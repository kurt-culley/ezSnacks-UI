import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItemsAction } from '../actions/itemActions';
import { addToOrderAction } from '../actions/orderActions';
import { Link, withRouter } from 'react-router-dom';
import { Button, Glyphicon } from 'react-bootstrap';

class ItemsIndex extends Component {

    componentDidMount() {
        this.props.dispatch(fetchItemsAction(this.props.match.params.id));
    }

    handleClick(itemId) {
        this.props.dispatch(addToOrderAction(itemId));
    }

    renderItems() {

        if (!this.props.items) {
            return <div>Loading...</div>;
        }

        return this.props.items.map((item) => {
            return (
                <li
                    className="list-group-item"
                    key={item.id}>
                    <div className="row-">
                        <div className="col-xs-4 col-sm-2 vcenter">
                            <img src={item.image_url} />
                        </div>
                        <div className="col-xs-6 col-sm-6 vcenter">
                            <h4 onClick={() => this.handleClick(item.id)}>{item.name}</h4>
                            <small>{item.description}</small>
                        </div>
                        <div className="col-xs-2 col-sm-4 vcenter">
                            <strong>£{item.price}</strong>
                        </div>
                    </div>
                </li>
            )
        })
    }

    render() {
        return (
            <div>
                <h3 className="menu-header">Category Items</h3>
                <ul className="list-group menu-list" >
                    {this.renderItems()}
                </ul>
                <div>
                    <div>
                        <Button
                            bsStyle="primary"
                            bsSize="large"
                            className="back-btn">
                            <Link to="/categories/"><Glyphicon glyph="glyphicon glyphicon-arrow-left" /></Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ items }) => ({
    items: items[0]
});

export default connect(mapStateToProps)(ItemsIndex);

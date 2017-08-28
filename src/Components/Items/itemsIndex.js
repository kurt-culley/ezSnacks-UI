import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchItemsAction} from '../../Actions/itemActions';
import {addToOrderAction} from '../../Actions/orderActions';
import {Link, withRouter} from 'react-router-dom';
import {Button, Glyphicon} from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
                            <img src={item.image_url}/>
                        </div>
                        <div className="col-xs-6 col-sm-9 vcenter">
                            <h4 onClick={() => this.handleClick(item.id)}>
                                {item.name}
                            </h4>
                            <small>{item.description}</small>
                        </div>
                        <div className="col-xs-2 col-sm-1 vcenter">
                            <strong>£{item.price}</strong>
                        </div>
                    </div>
                </li>
            )
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2">
                        <h3 className="menu-header">Category Items</h3>
                        <ReactCSSTransitionGroup
                            transitionName="menu"
                            transitionAppear={true}
                            transitionAppearTimeout={500}
                            transitionEnter={false}
                            transitionLeave={false}>
                            <ul className="list-group menu-list">
                                {this.renderItems()}
                            </ul>
                        </ReactCSSTransitionGroup>
                        <div>
                            <div>
                                <Button
                                    bsSize="large"
                                    className="back-btn">
                                    <Link to="/categories/"><Glyphicon glyph="glyphicon glyphicon-arrow-left"/></Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({items}) => ({
    items: items[0]
});

export default connect(mapStateToProps)(ItemsIndex);

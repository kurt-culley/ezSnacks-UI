import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import ItemsModal from './itemsModal';
import ItemsEditForm from './itemsEditForm';
import {connect} from 'react-redux';
import {fetchItemsAction} from '../../Actions/itemActions';
import {Link, NavLink, browserHistory, withRouter} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Button, Glyphicon} from 'react-bootstrap';
import {deleteItem} from '../../Api/api';

class ItemsManage extends Component {

    constructor() {
        super();
        this.state = {
            showNew: false,
            showEdit: false,
        };

        this.handleOpenNew = this.handleOpenNew.bind(this);
        this.handleOpenEdit = this.handleOpenEdit.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchItemsAction(this.props.match.params.id));
    }

    handleOpenNew() {
        if (this.state.showNew === false) {
            this.setState({showNew: true});
        } else {
            this.setState({showNew: false});
        }
    }

    handleOpenEdit() {
        if (this.state.showEdit === false) {
            this.setState({showEdit: true});
        } else {
            this.setState({showEdit: false});
        }
    }

    handleDeleteItem(id) {
        deleteItem(id).then(() => {
            window.location.reload();
        });
    }

    renderItems() {
        if (!this.props.items) {
            return <div>Loading...</div>;
        }

        return this.props.items.map((item) => {
            return (
                <li
                    className="list-group-item"
                    key={item.id}
                >
                    <div className="row-">
                        <div className="col-xs-4 col-sm-2 vcenter">
                            <img src={item.image_url}/>
                        </div>
                        <div className="col-xs-4 col-sm-9 vcenter">
                            <h4>{item.name}</h4>
                            <small>{item.description} - £{item.price}</small>
                        </div>
                        <div className="col-xs-4 col-sm-1 vcenter">
                            <div className="row">
                                <div className="col-xs-6 col-sm-6">
                                    <button className="btn btn-default order-item-quantity-btn">
                                        <Glyphicon glyph="glyphicon glyphicon-wrench"
                                                   onClick={this.handleOpenEdit}/>
                                    </button>
                                </div>

                                <div className="col-xs-6 col-sm-6">
                                    <button className="btn btn-danger order-item-quantity-btn">
                                        <Glyphicon glyph="glyphicon glyphicon-trash"
                                                   onClick={() => {
                                                       if (confirm('Are you sure?')) {
                                                           this.handleDeleteItem(item.id);
                                                       }
                                                   }}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    { this.state.showEdit ? <ItemsEditForm form={'form' + item.id} item={item}/> : <div></div> }
                </li>
            )
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-10 col-sm-offset-1">
                        <h3 className="menu-header">Manage Items</h3>
                        <ReactCSSTransitionGroup
                            transitionName="menu"
                            transitionAppear={true}
                            transitionAppearTimeout={500}
                            transitionEnter={false}
                            transitionLeave={false}>
                            <ul className="list-group menu-list">
                                {this.renderItems()}
                            </ul>
                            <Button
                                bsSize="large"
                                className="back-btn">
                                <Link to="/categories/manage"><Glyphicon glyph="glyphicon glyphicon-arrow-left"/></Link>
                            </Button>
                        </ReactCSSTransitionGroup>
                        <ItemsModal />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({items}) => ({
    items: items[0]
});

export default withRouter(connect(mapStateToProps)(ItemsManage));

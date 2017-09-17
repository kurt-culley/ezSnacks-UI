import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import CategoriesModal from './categoriesModal';
import CategoriesEditForm from './categoriesEditForm';
import {connect} from 'react-redux';
import {fetchCategoriesAction} from '../../Actions/categoryActions';
import {Link, NavLink, browserHistory, withRouter} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Button, Glyphicon} from 'react-bootstrap';
import {deleteCategory} from '../../Api/api';

class CategoriesManage extends Component {

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
        if (localStorage.restaurantId) {
            this.props.dispatch(fetchCategoriesAction());
        } else {
            this.props.history.push("/order/new");
        }
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

    handleDeleteCategory(id) {
        deleteCategory(id).then(() => {
            window.location.reload();
        });
    }

    renderCategories() {
        if (!this.props.categories) {
            return <div>Loading...</div>;
        }

        return this.props.categories.map((category) => {
            return (
                <li
                    className="list-group-item"
                    key={category.id}
                >
                    <div className="row">
                        <div className="col-xs-4 col-sm-2 vcenter">
                            <img src={category.image_url}/>
                        </div>
                        <div className="col-xs-4 col-sm-9 vcenter">
                            <NavLink to={`/categories/${category.id}/items/manage`}>
                                <h4>{category.name}</h4>
                            </NavLink>
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
                                        <Glyphicon
                                            glyph="glyphicon glyphicon-trash"
                                            onClick={() => {
                                               if (confirm('Are you sure?')) {
                                                   this.handleDeleteCategory(category.id);
                                               }
                                            }}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    { this.state.showEdit ? <CategoriesEditForm form={'form' + category.id} category={category}/> :
                    <div></div> }
                </li>
            )
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-10 col-sm-offset-1">
                        <h3 className="menu-header">Manage Menu</h3>
                        <ReactCSSTransitionGroup
                            transitionName="menu"
                            transitionAppear={true}
                            transitionAppearTimeout={500}
                            transitionEnter={false}
                            transitionLeave={false}>
                            <ul className="list-group menu-list">
                                {this.renderCategories()}
                            </ul>
                            <Button
                                bsSize="large"
                                className="back-btn">
                                <Link to="/admin"><Glyphicon glyph="glyphicon glyphicon-arrow-left"/></Link>
                            </Button>
                        </ReactCSSTransitionGroup>
                        <CategoriesModal />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({categories}) => ({
    categories: categories[0]
});

export default withRouter(connect(mapStateToProps)(CategoriesManage));

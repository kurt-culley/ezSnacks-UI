import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategoriesAction } from '../actions/categoryActions';
import { NavLink, Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button, Glyphicon } from 'react-bootstrap';

class CategoriesIndex extends Component {

    componentDidMount() {
        if (localStorage.restaurantId) {
            this.props.dispatch(fetchCategoriesAction());
        } else {
            this.props.history.push("/order/new");
        }
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
                    <div className="row-">
                        <div className="col-xs-4 col-sm-2 vcenter">
                            <img src={category.image_url} />
                        </div>
                        <div className="col-xs-6 col-sm-6 vcenter">
                            <NavLink to={`/categories/${category.id}/items`}>
                                <h4>{category.name}</h4>
                            </NavLink>
                        </div>
                        <div className="col-xs-2 col-sm-4 vcenter"></div>
                    </div>
                </li>
            )
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h3 className="menu-header">Menu Categories</h3>
                    <ReactCSSTransitionGroup
                        transitionName="menu"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <ul className="list-group menu-list">
                            {this.renderCategories()}
                        </ul>
                    </ReactCSSTransitionGroup>
                    <Button
                        bsStyle="primary"
                        bsSize="large"
                        className="back-btn">
                        <Link to="/"><Glyphicon glyph="glyphicon glyphicon-arrow-left" /></Link>
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ categories }) => ({
    categories: categories[0]
});

export default connect(mapStateToProps)(CategoriesIndex);

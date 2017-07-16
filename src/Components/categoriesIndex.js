import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategoriesAction } from '../actions/categoryActions';
import { NavLink } from 'react-router-dom';


class CategoriesIndex extends Component {

  componentDidMount() {
    this.props.dispatch(fetchCategoriesAction());
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
        <h3 className="menu-header">Menu Categories</h3>
        <ul className="list-group menu-list">
          {this.renderCategories()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: categories[0]
});

export default connect(mapStateToProps)(CategoriesIndex);

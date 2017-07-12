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
          <img src={category.image_url} />
          <NavLink to={`/categories/${category.id}/items`}>
            <strong>{category.name}</strong>
          </NavLink>
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

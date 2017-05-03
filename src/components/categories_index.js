import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/index';
import { Link } from 'react-router';

class CategoriesIndex extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }

  renderCategories() {
    return this.props.categories.map((category) => {
      return (
        <li className="list-group-item" key={category.id}>
          <Link to={"categories/" + category.id + "/items"}>
            <strong>{category.name}</strong>
          </Link>
          <img src={category.image_url}/>
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/categories/new" className="btn btn-primary">
            Add Category
          </Link>
        </div>
        <h3>Categories</h3>
        <ul className="list-group">
          {this.renderCategories()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories.all };
}


export default connect(mapStateToProps, { fetchCategories })(CategoriesIndex);

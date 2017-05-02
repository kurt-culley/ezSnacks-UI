import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCategory, deleteCategory } from '../actions/index';
import { Link } from 'react-router';

class CategoriesShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchCategory(this.props.params.id);
  }

  onDeleteClick() {
    this.props.deleteCategory(this.props.params.id)
      .then(() => {
        this.context.router.push('/'); });
  }

  render() {
    const { category } = this.props;

    if (!this.props.category) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back to index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}>
          Delete Category
        </button>
        <h3>{category.name}</h3>
        <p><img src={category.image_url} /></p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { category: state.categories.category };
}

export default connect(mapStateToProps, { fetchCategory, deleteCategory })(CategoriesShow);

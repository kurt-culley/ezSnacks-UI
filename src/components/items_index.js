import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../actions/item_actions';
import { Link } from 'react-router';

class ItemsIndex extends Component {

  componentWillMount() {
    this.props.fetchItems(this.props.params.id);
  }

  renderItems() {
    return this.props.items.map((item) => {
      return (
        <li className="list-group-item" key={item.id}>
          <strong>{item.name} - {item.description} - £{item.price} </strong>
          <img src={item.image_url}/>
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <Link to="/">Back to categories</Link>
        <div className="text-xs-right">
          <Link to={ "/categories/" + this.props.params.id + "/items/new" } className="btn btn-primary">
            Add Item
          </Link>
        </div>
        <h3>Items</h3>
        <ul className="list-group">
          {this.renderItems()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { items: state.items.all };
}

export default connect(mapStateToProps, { fetchItems })(ItemsIndex);

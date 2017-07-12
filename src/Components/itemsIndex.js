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
          <img src={item.image_url} />
          <strong onClick={() => this.handleClick(item.id)} >{item.name} - £{item.price}</strong>
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

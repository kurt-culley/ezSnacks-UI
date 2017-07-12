import React, { Component } from 'react';
import Order from './order';
import { Modal, Button, Glyphicon } from 'react-bootstrap';
import { browserHistory, withRouter } from 'react-router-dom';

class OrderContainer extends Component {

  constructor() {
      super();
      this.state = {
          showModal: false,
      };
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
  }

  componentDidMount() {
    if (localStorage.restaurantId) {
      this.props.history.push("/categories");
    }
  }

  close() {
   this.setState({ showModal: false });
  }

  open() {
   this.setState({ showModal: true });
  }

  render() {
    if (localStorage.restaurantId) {
      return (
        <div>
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={this.open}
            className="order-btn"
          >
            <Glyphicon glyph="glyphicon glyphicon-shopping-cart" />
          </Button>
          <div>
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Order</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Order orderId={localStorage.orderId}/>
              </Modal.Body>
              <Modal.Footer>
                <div className="container">
                  <div className="row">
                    <div className="col-xs-2">
                      <Button className="pull-left btn-danger" onClick={this.close}>Cancel</Button>
                    </div>
                    <div className="col-xs-8 text-center">
                      <Button className="btn-success" onClick={this.close}>Checkout</Button>
                    </div>
                    <div className="col-xs-2">
                      <Button className="pull-right" onClick={this.close}>Close</Button>
                    </div>
                  </div>
                </div>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default withRouter(OrderContainer);

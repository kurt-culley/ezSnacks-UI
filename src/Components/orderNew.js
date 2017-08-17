import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import { createOrder } from '../Api/api';
import { connect } from 'react-redux';
import { fetchCategoriesAction } from '../actions/categoryActions';
import { browserHistory, withRouter } from 'react-router-dom';

class OrderNew extends Component {
    constructor(props){
        super(props);
        this.state = {
            delay: 500,
            result: 'No result',
        };
        this.handleScan = this.handleScan.bind(this);
    }


    handleScan(result){
        if(result){
            const resultParsed = JSON.parse(result);
            createOrder(resultParsed.restaurant_id, resultParsed.table_id);
            localStorage.setItem("restaurantId", resultParsed.restaurant_id);
            this.props.dispatch(fetchCategoriesAction());
            this.props.history.push("/categories");
        }
    }

    handleError(err){
        console.error(err)
    }

    render(){

        const previewStyle = {
            height: '50%',
            width: '100%',
            boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.5)',
            borderColor: '#04bf00',
            borderStyle: 'solid'
        };

        return(
            <div className="container-fluid">
                <h3 className="menu-header">New Order</h3>
                <p>Scan QRCode to begin</p>
              <div className="row">
                <div className="col-xs-12" >
                  <QrReader
                      delay={this.state.delay}
                      style={previewStyle}
                      onError={this.handleError}
                      onScan={this.handleScan}
                      facingMode='rear'
                  />
                </div>
              </div>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    className="back-btn">
                    <Link to="/"><Glyphicon glyph="glyphicon glyphicon-arrow-left" /></Link>
                </Button>
            </div>
        )
    }
}

export default withRouter(connect()(OrderNew));

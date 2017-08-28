import React, {Component} from 'react'
import QrReader from 'react-qr-reader'
import {createOrder} from '../../Api/api';
import {connect} from 'react-redux';
import {fetchCategoriesAction} from '../../Actions/categoryActions';
import {browserHistory, withRouter, Link} from 'react-router-dom';
import {Button, Glyphicon} from 'react-bootstrap';

class OrderNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 500,
            result: 'No result',
        };
        this.handleScan = this.handleScan.bind(this);
    }


    handleScan(result) {
        if (result) {
            const resultParsed = JSON.parse(result);
            createOrder(resultParsed.restaurant_id, resultParsed.table_id);
            localStorage.setItem("restaurantId", resultParsed.restaurant_id);
            this.props.dispatch(fetchCategoriesAction());
            this.props.history.push("/categories");
        }
    }

    handleError(err) {
        console.error(err)
    }

    render() {

        const previewStyle = {
            height: '50%',
            width: '100%',
            boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.5)',
            borderColor: '#04bf00',
            borderStyle: 'solid'
        };

        return (
            <div className="container-fluid">
                <h3 className="qrcode-header">New Order</h3>
                <p className="new-order-text">Scan QR code to begin</p>
                <div className="row">
                    <div className="col-xs-12">
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
                    bsSize="large"
                    className="back-btn">
                    <Link to="/"><Glyphicon glyph="glyphicon glyphicon-arrow-left"/></Link>
                </Button>
            </div>
        )
    }
}

export default withRouter(connect()(OrderNew));

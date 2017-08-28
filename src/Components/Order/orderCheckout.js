import React, { Component } from 'react';
import Dropin from 'braintree-web-drop-in';
import { checkoutOrder, getPaymentToken } from '../../Api/api';

class OrderCheckout extends Component {

    constructor() {
        super();
        this.state = {
            checkout: false,
            token: null,
        };
    }

    componentDidMount(){
        let self = this;
        getPaymentToken().then(function(result) {
            self.setState({token: result})
        });
    }

    renderDropin() {
        if (this.state.token) {
            Dropin.create({
                authorization: `${this.state.token}`,
                container: '#dropin-container',
            }, function(err, dropinInstance) {
                let submitButton = document.getElementById('checkoutButton');
                if (err) {
                    console.error(err);
                    return;
                }
                if (submitButton) {
                    submitButton.addEventListener('click', function () {
                        dropinInstance.requestPaymentMethod(function (err, payload) {
                            if (err) {
                                console.log(err);
                            }
                            checkoutOrder(payload.nonce).then(function (result) {
                                if (result.status === 201) {
                                    window.location.reload();
                                }
                            })
                        });
                    });
                }
            });
        }
    }

    render() {
        return (
            <div>
                <div id="dropin-container"></div>
                <button id="checkoutButton" className="btn btn-block btn-success">Confirm and Pay</button>
                {this.renderDropin()}
            </div>

        );
    }
}

export default OrderCheckout;
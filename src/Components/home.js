import React, { Component } from 'react';
import Qrcode from './qrcode';

class Home extends Component {

    render() {
        if (!localStorage.getItem('orderId')) {
            return (
                <div>
                    <div>
                        <h4 className="qrcode-header">Please centre QR and hold until redirected</h4>
                    </div>
                    <div>
                        <Qrcode />
                    </div>
                </div>
            );
        } else {
            return (
                <div>Error. Please refresh.</div>
            );
        }
    }
}

export default Home;

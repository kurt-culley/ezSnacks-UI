import React, {Component} from 'react';
import {Modal, Button, Glyphicon} from 'react-bootstrap';
import {browserHistory, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import CategoriesNewForm from './categoriesNewForm';

class CategoriesModal extends Component {

    constructor() {
        super();
        this.state = {
            showModal: false,
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    handleOpenModal() {
        this.setState({showModal: true});
    }

    render() {
        return (
            <div>
                <Button
                    bsSize="large"
                    onClick={this.handleOpenModal}
                    className="bottom-right-btn form-modal-button btn-success"
                >
                    <Glyphicon glyph="glyphicon glyphicon-plus"/>
                </Button>
                <div>
                    <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                        <CategoriesNewForm />
                        <Modal.Footer>
                            <div>
                                <div className="row">
                                    <div className="col-xs-4 col-xs-offset-8">
                                        <Button
                                            className="pull-right close-btn"
                                            onClick={this.handleCloseModal}>
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default withRouter(connect()(CategoriesModal));

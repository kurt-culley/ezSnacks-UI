import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {browserHistory, withRouter} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {updateItem} from '../../Api/api';

class ItemsEditForm extends Component {

    renderField(field) {
        return (
            <div className='form-group'>
                <label>{field.label}</label>
                <input
                    placeholder={field.placeholder}
                    className="form-control"
                    type="text"
                    {...field.input}
                />
            </div>
        );
    }

    onSubmit(values) {
        updateItem(values, this.props.item.id).then(() => {
            window.location.reload();
        });
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="category-edit-form">
                <ReactCSSTransitionGroup
                    transitionName="menu"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                <Field
                                    placeholder={this.props.item.name}
                                    label="Name"
                                    name="name"
                                    component={this.renderField}
                                />
                                <Field
                                    placeholder={this.props.item.image_url}
                                    label="Image URL"
                                    name="image"
                                    component={this.renderField}
                                />
                                <Field
                                    placeholder={this.props.item.price}
                                    label="Price"
                                    name="price"
                                    component={this.renderField}
                                />
                                <Field
                                    placeholder={this.props.item.description}
                                    label="Description"
                                    name="description"
                                    component={this.renderField}
                                />
                                <button type="submit" className="btn btn-block btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default reduxForm({})(withRouter(connect(null)(ItemsEditForm)));

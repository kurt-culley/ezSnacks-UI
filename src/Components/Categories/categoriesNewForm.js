import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {browserHistory, withRouter} from 'react-router-dom';
import { createCategory } from '../../Api/api';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class CategoriesNewForm extends Component {

    renderField(field){
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        createCategory(values).then(() => {
            window.location.reload();
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
                <div className="category-form">
                    <ReactCSSTransitionGroup
                        transitionName="menu"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Name"
                                name="name"
                                component={this.renderField}
                            />
                            <Field
                                label="Image URL"
                                name="image"
                                component={this.renderField}
                            />
                            <button type="submit" className="btn btn-block btn-primary">Create</button>
                        </form>
                    </ReactCSSTransitionGroup>
                </div>
        );
    }
}

function validate(values) {

    const errors = {};

    if (!values.name) {
        errors.name = "Enter a category name."
    }
    if (!values.image) {
        errors.image = "Enter a category image URL."
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'CategoriesNewForm'
})(
    withRouter(connect(null)(CategoriesNewForm))
);
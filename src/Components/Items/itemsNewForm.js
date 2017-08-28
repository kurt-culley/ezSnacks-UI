import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {browserHistory, withRouter} from 'react-router-dom';
import {createItem} from '../../Api/api';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ItemsNewForm extends Component {

    renderField(field) {
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-error' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="help-block">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        createItem(values, this.props.match.params.id).then(() => {
            window.location.reload();
        });
    }

    render() {
        const {handleSubmit} = this.props;

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
                        <Field
                            label="Price"
                            name="price"
                            component={this.renderField}
                        />
                        <Field
                            label="Description"
                            name="description"
                            component={this.renderField}
                        />
                        <button type="Create" className="btn btn-block btn-primary">Submit</button>
                    </form>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

function validate(values) {

    const errors = {};

    if (!values.name) {
        errors.name = "Enter a item name."
    }
    if (!values.image) {
        errors.image = "Enter a item image URL."
    }
    if (!values.price) {
        errors.price = "Enter a item price."
    }
    if (!values.description) {
        errors.description = "Enter a item description."
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'ItemsNewForm'
})(
    withRouter(connect(null)(ItemsNewForm))
);
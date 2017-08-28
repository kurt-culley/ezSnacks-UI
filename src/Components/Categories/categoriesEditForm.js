import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {browserHistory, withRouter} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {updateCategory} from '../../Api/api';

class CategoriesEditForm extends Component {

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
        updateCategory(values, this.props.category.id).then(() => {
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
                                    placeholder={this.props.category.name}
                                    label="Name"
                                    name="name"
                                    component={this.renderField}
                                />
                                <Field
                                    placeholder={this.props.category.image_url}
                                    label="Image URL"
                                    name="image"
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

export default reduxForm({})(withRouter(CategoriesEditForm));

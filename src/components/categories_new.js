import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { createCategory } from '../actions/index';
import { Link } from 'react-router';

const FIELDS = {
  name: {
    type: 'input',
    label: 'Name of Category'
  },
  image_url: {
    type: 'input',
    label: 'Image URL for Category'
  }
};

class CategoriesNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];

    return (
      <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
        <div className="text-help">
          {fieldHelper .touched ? fieldHelper.error : ''}
        </div>
      </div>
    );
  }

  onSubmit(props) {
    this.props.createCategory(props)
      .then(() => {
        // blog post has been created, navigate user to index
        // we navigate by calling this.content.router.push
        // with the new path
        this.context.router.push('/');
      });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Category</h3>
        {_.map(FIELDS, this.renderField.bind(this))}
        <button type="sumbit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `Enter a ${field}`;
    }
  });

  return errors;
}

export default reduxForm({
  form: 'CategoriesNew',
  fields: _.keys(FIELDS),
  validate
}, null, { createCategory })(CategoriesNew);

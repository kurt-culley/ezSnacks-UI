import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { createItem } from '../actions/item_actions';
import { Link } from 'react-router';

const FIELDS = {
  name: {
    type: 'input',
    label: 'Name of Item'
  },
  description: {
    type: 'input',
    label: 'Description of Item'
  },
  price: {
    type: 'input',
    label: 'Price of Item'
  },
  image_url: {
    type: 'input',
    label: 'Image URL for Item'
  }
};

class ItemsNew extends Component {
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
    this.props.createItem(this.props.params.id, props)
      .then(() => {
        this.context.router.push('/');
      });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Item</h3>
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
  form: 'ItemsNew',
  fields: _.keys(FIELDS),
  validate
}, null, { createItem })(ItemsNew);

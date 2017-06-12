import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hasContent } from '../utils';
import DefaultCell from './DefaultCell';
import { capitalize } from '../utils';

class FieldWrapper extends Component {
  render() {
    const {title, data : fieldData} = this.props;
    const {data, description} = fieldData || {};
    return (
      <div>
        <h3 style={{
          margin: '1em 0 0'
        }}>{capitalize(title)}</h3>
        <p><em>{capitalize(description)}</em></p>
        <div>
        {
          hasContent(data) ?
            this.props.children ?
              this.props.children({
                data: data
              }) :
              <DefaultCell data={data} /> :
            <span>No data available</span>
        }
        </div>
        <hr/>
      </div>
    );
  }
}

FieldWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object,
  children: PropTypes.node
};

export default FieldWrapper;

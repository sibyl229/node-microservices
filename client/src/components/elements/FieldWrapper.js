import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hasContent } from '../utils';
import DefaultCell from './DefaultCell';
import { capitalize } from '../utils';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

class FieldWrapper extends Component {
  render() {
    const {title, data : fieldData} = this.props;
    const {data, description} = fieldData || {};
    return (
      <div style={{
        margin: '1em 0'
      }}>
        <h3 style={{
          margin: '0'
        }}>
          {capitalize(title)}
          <IconButton
            iconClassName="material-icons"
            tooltip={capitalize(description)}
            tooltipPosition="bottom-right"
            tooltipStyles={{
              fontSize: 12,
            }}>
            info_outline
          </IconButton>
        </h3>
        <Divider />
        <div style={{
          margin: '0.5em 0'
        }}>
        {
          hasContent(data) ?
            this.props.render ?
              this.props.render({
                data: data
              }) :
              <DefaultCell data={data} /> :
            <span>No data available</span>
        }
        </div>
      </div>
    );
  }
}

FieldWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object,
  render: PropTypes.func
};

export default FieldWrapper;

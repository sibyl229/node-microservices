import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hasContent } from '../utils';
import DefaultCell from './DefaultCell';
import ControlledTable from './ControlledTable';
import { capitalize } from '../utils';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

function isLikelyTable(data) {
  return (
    Array.isArray(data) &&
    typeof data[0] === 'object' &&
    Object.keys(data[0]).indexOf('class') === -1 &&
    (
      Object.keys(data[0]).indexOf('evidence') === -1 ||
      Object.keys(data[0]).indexOf('text') === -1
    )
  );
}

class FieldWrapper extends Component {

  chooseComponent = (data) => {
    if (hasContent(data)) {
      if (this.props.render) {
        return this.props.render;
      } else if (isLikelyTable(data)) {
//        return () => (<span style={{color: 'red'}}>{JSON.stringify(data, null, 4)}</span>);
        return ControlledTable;
      } else {
        return DefaultCell;
      }
    } else {
      return () => (
        <span>No data available</span>
      );
    }
  }

  render() {
    const {title, render: CustomRender, data : fieldData} = this.props;
    const {data, description} = fieldData || {};
    const ChosenComponent = this.chooseComponent(data);
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
          <ChosenComponent data={data} />
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

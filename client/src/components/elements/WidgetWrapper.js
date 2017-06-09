import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { hasContent } from '../utils';

class WidgetWrapper extends Component {
  render() {
    const {title, error, data} = this.props;
    return (
      <Paper>
        <h3>{title}</h3>
        {
          error ? <span>{JSON.stringify}</span> : null
        }
        {
          hasContent(data) ? this.props.children : <span>No data available</span>
        }
      </Paper>
    );
  }
}

WidgetWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object,
  error: PropTypes.object,
  children: PropTypes.node
};

export default WidgetWrapper;

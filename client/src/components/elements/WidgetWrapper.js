import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { hasContent } from '../utils';

class WidgetWrapper extends Component {
  render() {
    const {title, error, data} = this.props;
    return (
      <Paper style={{
        textAlign: 'left',
        padding: '1em 3em'
      }}>
        <h3>{title}</h3>
        {
          error ? <span>{JSON.stringify}</span> : null
        }
        {
          hasContent(data) ?
            this.props.children :
            <span>
            {
              this.props.loading ? 'Loading' : 'No data available'
            }
            </span>
        }
      </Paper>
    );
  }
}

WidgetWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.object,
  children: PropTypes.node
};

export default WidgetWrapper;

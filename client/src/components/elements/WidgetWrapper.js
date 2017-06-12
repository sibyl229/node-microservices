import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { hasContent } from '../utils';
import { capitalize } from '../utils';

class WidgetWrapper extends Component {
  render() {
    const {title, error, data, loading} = this.props;
    return (
      <Paper style={{
        textAlign: 'left',
        padding: '1em 3em'
      }}>
        <h2>{capitalize(title || '')}</h2>
        {
          error ? <span>{JSON.stringify}</span> : null
        }
        {
          hasContent(data) ?
            this.props.children :
            <span>
            {
              loading ? 'Loading' : 'No data available'
            }
            </span>
        }
      </Paper>
    );
  }
}

WidgetWrapper.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.object,
  children: PropTypes.node
};

export default WidgetWrapper;

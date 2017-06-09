import React, { Component } from 'react';
import PropTypes from 'prop-types';

const DefaultCell = (props) => {
  const data = props.data;
  if (data !== null && typeof data === 'object') {
    if (Array.isArray(data)) {
      return (
        <ul>
        {
          data.map((dat) => (
            <li>{JSON.stringify(dat)}</li>
          ))
        }
        </ul>
      );
    } else {
      return (<span>{JSON.stringify(data)}</span>);
    }
  } else {
    return (<span>{data}</span>)
  }
};

DefaultCell.propTypes = {
  data: PropTypes.object
};

export default DefaultCell;

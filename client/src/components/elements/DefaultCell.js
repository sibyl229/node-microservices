import React, { Component } from 'react';
import PropTypes from 'prop-types';

const DefaultCell = (props) => {
  const data = props.data;
  switch (data.id) {
    default:
      return (
        <span>{JSON.stringify(data)}</span>
      );
  }
};

DefaultCell.propTypes = {
  data: PropTypes.object
};

export default DefaultCell;

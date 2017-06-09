import React, { Component } from 'react';
import PropTypes from 'prop-types';

const GeneOverview = (props) => {
  return (
    <div>
      <h2>Gene Overview</h2>
      {JSON.stringify(props.data)}
    </div>
  )
};

GeneOverview.propTypes = {
  data: PropTypes.object
};


export default GeneOverview;

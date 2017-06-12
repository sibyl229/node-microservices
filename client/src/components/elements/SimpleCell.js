import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SimpleCell = (props) => {
  const {data} = props;
  if (data !== null && typeof data === 'object') {
    if (data.class) {
      const {label, id} = data;
      return <Link to={`/${data.class}/${id}`}>{label}</Link>;
    } else {
      return (<span>{JSON.stringify(data)}</span>);
    }
  } else {
    return <span>{data}</span>;
  }
};

SimpleCell.propTypes = {
  data: PropTypes.object
};

export default SimpleCell;

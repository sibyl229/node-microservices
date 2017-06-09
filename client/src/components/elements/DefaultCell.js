import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { hasContent } from '../utils';

function DefaultCell(props) {
  const data = props.data;
  if (data !== null && typeof data === 'object') {
    if (Array.isArray(data)) {
      return (
        <ul>
        {
          data.filter((dat) => (
            hasContent(dat)
          )).map((dat) => (
            <li>{<DefaultCell data={dat} />}</li>
          ))
        }
        </ul>
      );
    } else {
      if (data.class) {
        const {label, id} = data;
        return <Link to={`/${data.class}/${id}`}>{label}</Link>
      } else {
        return (<span>{JSON.stringify(data)}</span>);
      }
    }
  } else {
    return (<span>{data}</span>)
  }
};

DefaultCell.propTypes = {
  data: PropTypes.object
};

export default DefaultCell;

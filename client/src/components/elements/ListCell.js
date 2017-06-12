import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hasContent } from '../utils';

const ListCell = (props) => {
  const {data, render} = props;
  return (
    <ul>
    {
      data.filter((dat) => (
        hasContent(dat)
      )).map((dat) => (
        <li>{render({elementData: dat})}</li>
      ))
    }
    </ul>
  );
};

ListCell.propTypes = {
  date: PropTypes.object,
  render: PropTypes.func
};

export default ListCell;

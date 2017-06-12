import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hasContent } from '../utils';
import SimpleCell from './SimpleCell';

const HashCell = (props) => {
  const {data, render} = props;
  return (
    <ul>
    {
      Object.keys(data).filter((key) => (
        hasContent(data[key])
      )).map((key) => (
        <li>
        {key.replace(/_+/g, ' ')}:
        <br/>
        {render ? render({elementData: data[key]}) : <SimpleCell data={data[key]} />}
        </li>
      ))
    }
    </ul>
  );
};

HashCell.propTypes = {
  data: PropTypes.object,
  render: PropTypes.func
};

export default HashCell;

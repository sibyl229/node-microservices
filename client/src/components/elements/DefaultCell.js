import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EvidenceCell from './EvidenceCell';
import SimpleCell from './SimpleCell';
import ListCell from './ListCell';

function DefaultCell(props) {
  const data = props.data;
  if (data !== null && typeof data === 'object') {
    if (Array.isArray(data)) {
      return (
        <ListCell
          data={data}
          render={
            ({elementData}) => <SimpleCell data={elementData} />
          }
        />
      );
    } else {
      if (data.evidence && data.text) {
        return <EvidenceCell data={data} />;
      } else {
        return <SimpleCell data={data} />;
      }
    }
  } else {
    return <SimpleCell data={data} />;
  }
};

DefaultCell.propTypes = {
  data: PropTypes.object
};

export default DefaultCell;

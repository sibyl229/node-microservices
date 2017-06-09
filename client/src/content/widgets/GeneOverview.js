import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldWrapper from '../../components/elements/FieldWrapper';

const GeneOverview = (props) => {
  return (
    <div>
      <h2>Gene Overview</h2>
      {JSON.stringify(Object.keys(props.data.fields))}
      {
        Object.keys(props.data.fields).map((fieldKey) => (
          <FieldWrapper key={fieldKey}
            title={fieldKey.replace(/_+/g, ' ')}
            data={props.data.fields[fieldKey]} />
        ))
      }
    </div>
  )
};

GeneOverview.propTypes = {
  data: PropTypes.object
};


export default GeneOverview;

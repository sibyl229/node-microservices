import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldWrapper from '../../components/elements/FieldWrapper';

const GenericWidget = (props) => {
  return (
    <div>
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

GenericWidget.propTypes = {
  data: PropTypes.object
};


export default GenericWidget;

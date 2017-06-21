import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldWrapper from '../../components/elements/FieldWrapper';

const GenericWidget = (props) => {
  return (
    <div>
      {/* {JSON.stringify(Object.keys(props.data.fields), null, 4)} */}
      {
        Object.keys(props.data.fields).sort(
          (fieldKeyA, fieldKeyB) => {
            const getPriority = (fieldKey) => {
              const priorityArray = ["name"];
              const index = priorityArray.indexOf(fieldKey);
              return index === -1 ? priorityArray.length : index;
            }
            return getPriority(fieldKeyA) - getPriority(fieldKeyB);
          }
        ).map((fieldKey) => (
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

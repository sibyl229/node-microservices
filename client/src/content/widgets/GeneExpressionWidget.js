import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldWrapper from '../../components/elements/FieldWrapper';
import ControlledTable from '../../components/elements/ControlledTable';

const GeneExpressionWidget = (props) => {
  return (
    <div>
      {JSON.stringify(Object.keys(props.data.fields), null, 4)}

      <br/>custom expression widget
      <FieldWrapper
        title={'Expression cluster'}
        data={props.data.fields.expression_cluster}
        render={ControlledTable} />
      {
        Object.keys(props.data.fields).filter(
          (fieldKey) => fieldKey !== 'expression_cluster'
        ).map((fieldKey) => (
          <FieldWrapper key={fieldKey}
            title={fieldKey.replace(/_+/g, ' ')}
            data={props.data.fields[fieldKey]} />
        ))
      }
    </div>
  )
};

GeneExpressionWidget.propTypes = {
  data: PropTypes.object
};


export default GeneExpressionWidget;

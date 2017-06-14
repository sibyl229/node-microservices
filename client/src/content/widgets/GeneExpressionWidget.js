import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldWrapper from '../../components/elements/FieldWrapper';
import Table from '../../components/elements/Table';

const GeneExpressionWidget = (props) => {
  return (
    <div>
      {JSON.stringify(Object.keys(props.data.fields), null, 4)}

      <br/>custom expression widget
      <FieldWrapper
        title={'Expression cluster'}
        data={props.data.fields.expression_cluster}
        render={Table} />
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

GeneExpressionWidget.propTypes = {
  data: PropTypes.object
};


export default GeneExpressionWidget;

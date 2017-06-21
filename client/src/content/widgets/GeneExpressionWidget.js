import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldWrapper from '../../components/elements/FieldWrapper';
import ControlledTable from '../../components/elements/ControlledTable';

const GeneExpressionWidget = (props) => {
  return (
    <div>
      {/* {JSON.stringify(Object.keys(props.data.fields), null, 4)} */}

      <p>start of custom fields</p>
      <h3>{props.data.fields.name.data.label}</h3>

      <FieldWrapper
        title="WormBase ID"
        data={props.data.fields.name}
        render={({data}) => <div>{data.id}</div>}/>

      <FieldWrapper
        title={'Expression cluster'}
        data={props.data.fields.expression_cluster}
        render={ControlledTable} />
      <p>end of custom fields</p>

      {
        Object.keys(props.data.fields).filter(
          (fieldKey) => fieldKey !== 'expression_cluster' && fieldKey !== 'name'
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

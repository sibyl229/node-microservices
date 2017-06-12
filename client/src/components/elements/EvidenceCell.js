import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const EvidenceCell = (props) => {
  const {content, detail} = props;
  const {contentData, detailData} = props.data || {};
  return (
    <Card>
      <CardHeader
        subtitle={content }
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardText>
    </Card>
  );
};

export default EvidenceCell;

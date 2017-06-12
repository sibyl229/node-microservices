import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import HashCell from './HashCell';

const EvidenceCell = (props) => {
  const {content, detail} = props;
  const {text: contentData, evidence: detailData} = props.data || {};
  console.log(detailData);
  return (
    <Card>
      <CardHeader
        title={content || contentData}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <span>
        {
          detail ? detail : <HashCell data={detailData} />
        }
        </span>
      </CardText>
    </Card>
  );
};

export default EvidenceCell;

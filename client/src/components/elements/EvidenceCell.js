import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const EvidenceCell = (props) => {
  const {renderContent, renderEvidence, data} = props;

  return (
    <Card>
      <CardHeader
        title={
          renderContent({
            contentData: data.text,
            data: data
          })
        }
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <span>
        {
          renderEvidence({
            evidenceData: data.evidence,
            data: data
          })
        }
        </span>
      </CardText>
    </Card>
  );
};

EvidenceCell.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.any,
    evidence: PropTypes.object
  }),
  renderContent: PropTypes.func,
  renderEvidence: PropTypes.func
};

export default EvidenceCell;

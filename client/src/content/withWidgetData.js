import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WidgetWrapper from './WidgetWrapper';
import { loadData } from './actions';

class DataFetcher extends Component {
  componentDidMount() {
    this.props.onRequestData(this.props.dataUrl);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dataUrl !== this.props.dataUrl) {
      this.props.onRequestData(this.props.dataUrl);
    }
  }
  render() {
    return this.props.children;
  }
}

DataFetcher.propTypes = {
  dataUrl: PropTypes.string.isRequired,
  onRequestData: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default function withWidgetData(WidgetComponent) {

  const DataFetchingWidgetComponent = (props) => {
    const {dataUrl, onRequestData, ...rest} = props;
    return (
      <DataFetcher dataUrl={dataUrl || `/rest/widget/gene/WBGene00015146/overview?content-type=application/json`} onRequestData={onRequestData}>
        <WidgetWrapper {...rest}>
          <WidgetComponent data={rest.data}/>
        </WidgetWrapper>
      </DataFetcher>
    )
  };
  DataFetchingWidgetComponent.propTypes = {
    dataUrl: PropTypes.string.isRequired,
    onRequestData: PropTypes.func.isRequired,
    data: PropTypes.object,
  //  error: PropTypes.string
  };


  const mapStateToProps = (state) => ({
    data: state.content.data,
    error: state.content.error
  });
  const mapDispatchToProps = (dispatch, ownProps) => ({
    onRequestData: (dataUrl) => dispatch(loadData(dataUrl))
  });

  return connect(mapStateToProps, mapDispatchToProps)(DataFetchingWidgetComponent);
}

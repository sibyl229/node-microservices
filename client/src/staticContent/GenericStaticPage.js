import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchStaticPage } from './actions';

class GenericStaticContent extends Component {
  fetchContent = (props) => {
    const {onFetchContent, contentUrl} = props;
    onFetchContent(contentUrl);
  }

  componentDidMount() {
    this.fetchContent(this.props);
  }

  componentDidUpdate() {
    this.fetchContent(this.props);
  }

  render() {
    const props = this.props;
    if (props.error) {
      return <span style={{color: 'red'}}>{props.error}</span>;
    } else if (props.html) {
      return <div dangerouslySetInnerHTML={{__html: props.html}} />;
    } else {
      return <span>Loading...</span>
    }
  }
}

GenericStaticContent.propTypes = {
  html: PropTypes.string.isRequired,
  contentUrl: PropTypes.string.isRequired,
  error: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
  html: state.staticContent.pages[ownProps.contentUrl],
  error: state.staticContent.error
});

const mapDispatchToProps = (dispatch) => ({
  onFetchContent: (contentUrl) => dispatch(fetchStaticPage(contentUrl))
});

export default connect(mapStateToProps, mapDispatchToProps)(GenericStaticContent);

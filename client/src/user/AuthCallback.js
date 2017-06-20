import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import { postAuthRedirect } from './actions';


class AuthCallback extends Component {

  componentDidMount() {
    this.props.dispatch(postAuthRedirect());
  }

  render() {
    return (null);
  }
}

AuthCallback.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(AuthCallback);

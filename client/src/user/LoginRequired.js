import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticate } from './actions';

const LOGIN_URL = `http://localhost:3003/api/auth?redirectTo=${window.location.href}`;

class LoginRequired extends Component {

  componentDidMount() {
    this.props.dispatch(authenticate());
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.jwt) {
      this.props.dispatch(authenticate());
    }
  }

  render() {
    return (
      this.props.jwt ?
        (this.props.children ?
          this.props.children({
            jwt: this.props.jwt
          }) : null) :
        <a href={LOGIN_URL}>Login</a>
    );
  }
}

LoginRequired.propTypes = {
  children: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
  jwt: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  return {
    jwt: state.user.jwt,
  }
}

export default connect(
  mapStateToProps
)(LoginRequired);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticate, logout } from './actions';
import RaisedButton from 'material-ui/RaisedButton';

const LOGIN_URL = `http://localhost:3003/auth?redirectTo=${window.location.href}`;

class LoginRequired extends Component {

  // componentDidMount() {
  //   this.props.dispatch(authenticate());
  // }
  //
  // componentWillUpdate(nextProps) {
  //   if (!nextProps.jwt) {
  //     this.props.dispatch(authenticate());
  //   }
  // }

  render() {
    return (
      this.props.jwt ?
        <div>
          <RaisedButton label="Logout" onClick={() => this.props.dispatch(logout())} />
          {
            this.props.children
          }
        </div> :
        <a href={LOGIN_URL}>Login with Google</a>
    );
  }
}

LoginRequired.propTypes = {
  children: PropTypes.node,
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

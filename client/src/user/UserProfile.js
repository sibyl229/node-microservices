import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { getUserProfile } from './actions';

class UserProfile extends Component {
  componentDidMount() {
    this.getUserProfileData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.userId !== this.props.userId) {
      this.getUserProfileData(nextProps);
    }
  }

  getUserProfileData(props) {
    // dispatch action to submit ajax request fro data
    const {dispatch, userId, jwt} = props;
    dispatch(getUserProfile(userId, jwt));
  }

  render() {
    const {userId, userProfileData} = this.props;
    return (
      userProfileData ?
        <div>
          <h3>{userProfileData.name}</h3>
          <p>{userProfileData.email}</p>
        </div> :
        null
    )
  }
}

UserProfile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userId: PropTypes.string,
  userProfileData: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string
  }),
  jwt: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  return {
    jwt: state.user.jwt,
    userProfileData: state.user.user.data
  };
};

export default connect(mapStateToProps)(UserProfile);

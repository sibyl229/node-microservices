import React, { Component } from 'react';
import Popover from 'material-ui/Popover/Popover';
import { connect } from 'react-redux';
import { search } from './actions';

const mapDispatchToProps = (dispatch) => ({
  onChange: (event, newValue) => dispatch(search(newValue))
});

export default connect(null, mapDispatchToProps)(TextField);

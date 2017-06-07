import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { search } from './actions';

const mapDispatchToProps = (dispatch) => ({
  onChange: (event, newValue) => dispatch(search(newValue, event.target))
});

export default connect(null, mapDispatchToProps)(TextField);

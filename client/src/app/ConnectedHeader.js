import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const mapStateToProps = (state) => {
  return {
    value: state.router.location.pathname
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (tabValue) => {
      dispatch(push(tabValue))
    }
  };
};

const ConnectedTabs = connect(mapStateToProps, mapDispatchToProps)(Tabs);

export default (props) => (
  <ConnectedTabs>
    <Tab label='Search' value='/search' />
    <Tab label='User Guides' value='/guide' />
    <Tab label='My WormBase' value='/user/profile' />
  </ConnectedTabs>
)

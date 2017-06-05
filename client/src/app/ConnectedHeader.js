import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Header from '../components/layout/Header';

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Header);

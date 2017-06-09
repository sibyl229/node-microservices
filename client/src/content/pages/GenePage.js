import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import withWidgetData from '../withWidgetData';
import {
  GeneOverview,
  GeneLocation
} from '../widgets/';

const GenePage = ({match}) => {
  return (
    <div>
      <Route exact path={`${match.path}`} component={withWidgetData(GeneOverview)} />
      <Route path={`${match.path}/location`} component={withWidgetData(GeneLocation)}/>
    </div>
  );
};

export default GenePage;

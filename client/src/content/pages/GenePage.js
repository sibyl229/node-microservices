import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import withWidgetData from '../withWidgetData';
import {
  GenericWidget,
  GeneOverview,
  GeneLocation
} from '../widgets/';

const GenePage = (props) => {
  const id = props.match.params.id;
  return (
    <Switch>
      <Route exact path={`${props.match.path}`}>
        <Redirect to={`${props.match.url}/overview`} />
      </Route>
      <Route
        path={`${props.match.path}/:widgetId`}
        component={withWidgetData(GenericWidget)}
      />
    </Switch>
  );
};

export default GenePage;

import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { matchPath } from 'react-router';
import withWidgetData from '../withWidgetData';
import { GenericWidget } from '../widgets/';
import PageNav from './PageNav';
import configs from '../configs';

const GenericPage = (props) => {
  const {page} = props.match.params;
  return (
    <div>
      <Switch>
        <Route exact path={`${props.match.path}`}>
          <Redirect to={`${props.match.url}/overview`} />
        </Route>
        <Route
          path={`${props.match.path}/:widgetId`}
          component={
            (widgetRouteProps) => {
              const GenericDataWidget = withWidgetData(GenericWidget)
              return (
                <div>
                  <PageNav
                    widgets={configs[page] ? configs[page].widgets : []}
                    baseUrl={props.match.url}
                    activeWidget={widgetRouteProps.match.params.widgetId}
                  />
                  <GenericDataWidget />
                </div>
              )
            }
          }
        />
      </Switch>
    </div>
  );
};

export default GenericPage;

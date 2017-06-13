import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { matchPath } from 'react-router';
import withWidgetData from '../withWidgetData';
import GenericWidget from '../widgets/GenericWidget';
import PageNav, { ExpandablePageNav } from './PageNav';
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
              const widgetId = widgetRouteProps.match.params.widgetId;
              const pageWidgets = configs[page] ? configs[page].widgets : [];
              const CustomWidget = pageWidgets.filter(
                (widgetConfig) => widgetConfig.id === widgetId
              ).map(
                (widgetConfig) => widgetConfig.render
              )[0];
              const DataWidget = withWidgetData(CustomWidget || GenericWidget);
              return (
                <div className="content">
                  <div className="content--left-sidebar">
                    <PageNav
                      widgets={pageWidgets}
                      baseUrl={props.match.url}
                      activeWidget={widgetId}
                    />
                  </div>
                  <div className="content--main">
                    <div className="small-only">
                      <ExpandablePageNav
                        widgets={pageWidgets}
                        baseUrl={props.match.url}
                        activeWidget={widgetId}
                      />
                    </div>
                    <DataWidget />
                  </div>
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

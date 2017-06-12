import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import withWidgetData from '../withWidgetData';
import {
  GenericWidget,
  GeneOverview,
  GeneLocation
} from '../widgets/';

const GenePage = (props) => {
  const id = props.match.params.id;
  return (
    <div>
      <Route exact path={`${props.match.path}`}>
        <Redirect to={`${props.match.url}/overview`} />
      </Route>
      <Route
        path={`${props.match.path}/:widgetId`}
        render={
          ({match}) => {
            const widgetId = match.params.widgetId;
            const widgetDataUrl = `/rest/widget/gene/${id}/${widgetId}?content-type=application/json`;
            const Widget = withWidgetData(GenericWidget);
            return <Widget dataUrl={widgetDataUrl} title={widgetId} />
          }
        }
      />
    </div>
  );
};

export default GenePage;

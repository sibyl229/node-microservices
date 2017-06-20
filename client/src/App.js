import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import theme from './app/theme';
import AuthButton from './user/AuthButton';
import UserProfile from './user/UserProfile';
import AuthCallback from './user/AuthCallback';
import GenericPage from './content/pages/GenericPage';
import SearchPage  from './search/SearchPage';
import GenericStaticPage from './staticContent/GenericStaticPage';
import StaticIndexPage from './staticContent/StaticIndexPage';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import ConnectedHeader from './app/ConnectedHeader';
import SearchBox from './search/SearchBox';


import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { loadState, saveState } from './app/localStorage';
import { Provider } from 'react-redux';


import createHistory from 'history/createBrowserHistory';
// import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

import userReducer from './user/reducers'; // Or wherever you keep your reducers
import searchReducer from './search/reducers';
import contentReducer from './content/reducers';
import staticContentReducer from './staticContent/reducers';

import thunk from 'redux-thunk';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [
  routerMiddleware(history),
  thunk
];

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);
const store = createStore(
  combineReducers({
    user: userReducer,
    router: routerReducer,
    search: searchReducer,
    content: contentReducer,
    staticContent: staticContentReducer
  }), loadState(), enhancer);

  store.subscribe(() => {
    // need to save the redirect path,
    // so the app knows where to go after login through google
    saveState({
      user: store.getState().user
    });
  });

setTimeout(() => {
  console.log(store.getState());
}, 300)
//store.dispatch()

// // Add the reducer to your store on the `router` key
// // Also apply our middleware for navigating
// const store = createStore(
//   combineReducers({
//     ...reducers,
//     router: routerReducer
//   }),
//   applyMiddleware(middleware)
// );

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

const Home = () => (
  <div>
    <h2>Home</h2>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
);

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider muiTheme={theme}>
            <div className="App">
              <ConnectedHeader />
              <SearchBox />
              {/* <Redirect exact path="/" to="/search" /> */}
              <div style={{textAlign: 'left', margin: '2em'}}>
              <Switch>
                <Route exact path="/" component={SearchPage} />
                <Route path="/user" render={
                  () => (
                    <div>
                      <AuthButton />
                      <Route path="/user/profile" component={UserProfile} />
                    </div>
                  )
                } />
                <Route path="/search" component={SearchPage} />
                <Route exact path="/guide" component={StaticIndexPage} />
                <Route exact path="/authCallback" component={AuthCallback} />
                <Route path="/guide/:id" render={
                  ({match}) => <GenericStaticPage contentUrl={`http://www.wormbase.org/rest/widget/static/${match.params.id}`} />
                } />
                <Route path="/:page/:id" component={GenericPage}/>
              </Switch>
              </div>
            </div>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;

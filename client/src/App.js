import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginRequired from './user/LoginRequired';
import UserProfile from './user/UserProfile';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import ConnectedHeader from './app/ConnectedHeader';
import SearchBox from './search/SearchBox';


import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';


import createHistory from 'history/createBrowserHistory';
// import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { Link, Route } from 'react-router-dom';

import userReducer from './user/reducers'; // Or wherever you keep your reducers
import searchReducer from './search/reducers';
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
  applyMiddleware(...middleware),
  // other store enhancers if any
);
const store = createStore(
  combineReducers({
    user: userReducer,
    router: routerReducer,
    search: searchReducer
  }), enhancer);

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
          <MuiThemeProvider>
            <div className="App">
              <ConnectedHeader />
              <SearchBox />
              <Route exact path="/" component={Home}/>
              <Route path="/user" render={
                () => (
                  <LoginRequired>
                  {({jwt}) => (
                    <UserProfile jwt={jwt} userId="1" />
                  )}
                  </LoginRequired>
                )
              } />
            </div>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;

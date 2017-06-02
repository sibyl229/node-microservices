import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginRequired from './user/LoginRequired';


import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';


import createHistory from 'history/createBrowserHistory';
// import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { Link, Route } from 'react-router-dom';

import userReducer from './user/reducers'; // Or wherever you keep your reducers


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [
  routerMiddleware(history)
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
    router: routerReducer
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

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to React</h2>
            </div>
            <hr/>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/topics">Topics</Link></li>
            </ul>
            <Route exact path="/" component={Home}/>
            <Route path="me" component={LoginRequired} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReduxPromise from "redux-promise";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import "./index.css";
import Router from "./Router";
import registerServiceWorker from "./registerServiceWorker";
import reducers from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(ReduxPromise, thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

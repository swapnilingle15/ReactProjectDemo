import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import { Login, ListPage } from "./home/Components";
const Router = () => (
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/employees" component={ListPage} />
      </Switch>
    </App>
  </BrowserRouter>
);

export default Router;

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import NotMatch from "layouts/NotMatch.jsx";
import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" component={Admin} />
      <Route component={NotMatch} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

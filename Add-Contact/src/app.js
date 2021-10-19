import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AddContact from "./component/AddContact";
import View from "./component/View";
import Update from "./component/Update";
import Delete from "./component/Delete";

const App = () => (
  <Router>
    <h1 className="display-3 border-info rounded text-center text-white">
      CONTACT LIST
    </h1>
    <Switch>
      <Route exact path="/" component={AddContact} />
      <Route path="/view" component={View} />
      <Route path="/update" component={Update} />
      <Route path="/delete" component={Delete} />
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("app"));

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FindIdPw from "./pages/FindIdPw";
import Page from "./pages/Page";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/page" component={Page} />
        <Route exact path="/find" component={FindIdPw} />
      </Switch>
    </Router>
  );
};

export default App;

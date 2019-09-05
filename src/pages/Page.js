import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import Write from "./Write";
import NavBar from "./NavBar";
import List from "./List";

const Page = () => {
  const { Header, Content } = Layout;
  return (
    <Router>
      <Header style={{ backgroundColor: "#d3adf7" }}>
        <Route path="/page" component={NavBar} />
        <span>triJournal</span>
      </Header>
      <Content style={{ padding: "30px 50px 50px 50px" }}>
        <Switch>
          <Route path="/page/write" component={Write} />
          <Route path="/page/list" component={List} />
        </Switch>
      </Content>
    </Router>
  );
};

export default Page;

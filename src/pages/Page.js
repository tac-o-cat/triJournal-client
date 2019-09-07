/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import Write from "./Write";
import NavBar from "./NavBar";
import List from "./List";
import MyInfo from "./MyInfo";
const API_HOST_URL = process.env.REACT_APP_API_HOST_URL;

const Page = props => {
  const { Header, Content } = Layout;
  const [currentUser, setCurrentUser] = useState({ username: undefined });
  useEffect(() => {
    let isSubscribed = true;

    fetch(`${API_HOST_URL}/users/${props.location.state.username}`)
      .then(res => res.json())
      .then(res => (isSubscribed ? setCurrentUser(res) : null));
    return () => (isSubscribed = false);
  }, [props.location.state.username]);

  return (
    <Router>
      <Header style={{ backgroundColor: "#d3adf7" }}>
        <Route path="/page" component={NavBar} />
        <span>triJournal</span>
      </Header>
      <Content style={{ padding: "30px 50px 50px 50px" }}>
        <Switch>
          <Route
            path="/page/write"
            component={() => <Write username={currentUser.username} />}
          />
          <Route path="/page/list" component={List} />
          <Route path="/page/myInfo" component={MyInfo} />
        </Switch>
      </Content>
    </Router>
  );
};

export default Page;

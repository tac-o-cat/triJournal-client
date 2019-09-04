import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, Icon } from "antd";
import Write from "./Write";
import NavBar from "./NavBar";

const Page = () => {
  const { Header, Content } = Layout;
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState({ user: "", profilePic: "" });
  return (
    <Router>
      <Header style={{ backgroundColor: "yellow" }}>
        {/*나중에 색깔 바꾸기*/}
        <Icon type="menu-fold" />
        <Route path="/page" component={NavBar} />
        <span>triJournal</span>
      </Header>
      <Content style={{ padding: "30px 50px 50px 50px" }}>
        <Switch>
          <Route path="/page/write" component={Write} />
        </Switch>
      </Content>
    </Router>
  );
};

export default Page;

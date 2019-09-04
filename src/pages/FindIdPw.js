import React from "react";
import { Button } from "antd";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import FindId from "./FindId";
import FindPw from "./FindPw";

const FindIdPw = () => {
  return (
    <Router>
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center"
        }}
      >
        <h3>아이디/비밀번호 찾기</h3>
        <Link to="/find/id">
          <Button>아이디 찾기</Button>
        </Link>
        <Link to="/find/password">
          <Button>비밀번호 찾기</Button>
        </Link>
        <Link to="/login">
          <Button>뒤로 가기</Button>
        </Link>
      </div>
      <Switch>
        <Route path="/find/id" component={FindId} />
        <Route path="/find/password" component={FindPw} />
      </Switch>
    </Router>
  );
};

export default FindIdPw;

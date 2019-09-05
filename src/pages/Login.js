/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Button, Input } from "antd";

const Login = () => {
  const [user, setUser] = useState({ id: null, password: null });
  const { id, password } = user;
  const handleClick = () => {
    //서버에 포스트 요청을 보낸다
    //보낼 값은 아이디와 비밀번호
    //서버에서 아이디와 비밀번호가 맞다는 응답이 온다면
    //page로 리다이렉트를 한다.
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
      }}
    >
      <h3>triJournal</h3>
      <div style={{ margin: "3px 3px 3px 3px" }}>
        <Input placeholder="ID" type="text" />
      </div>
      <div style={{ margin: "3px 3px 3px 3px" }}>
        <Input placeholder="Password" type="password" />
      </div>
      <Button onClick={handleClick} style={{ margin: "3px 3px 3px 3px" }}>
        Login
      </Button>
      <Link to="/signup">
        <div>Sign Up</div>
      </Link>
      <Link to="/find">
        <div>Find ID/Password</div>
      </Link>
    </div>
  );
};

export default Login;

//App.js 브라우저라우터 라우터 라우트 링크 데려오기
//App.js에서 라우터를 만든다 => path=/login으로 설정
//Component의 Attribute는 Login으로 설정
//Login.js 페이지에서 Id - <input> , pw - < input> , login - <button>, join - <div>, find - <div>
//API
//Login 클릭핳 때 post 요청

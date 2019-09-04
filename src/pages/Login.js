/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <div>
        ID: <input placeholder="Id" type="text" />
      </div>
      <div>
        PASSWORD: <input placeholder="Password" type="password" />
      </div>
      <button onClick={handleClick}>Login</button>
      <div>Sign Up</div>
      <Link to="/login/find">
        <div>Find ID, PASSWORD</div>
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

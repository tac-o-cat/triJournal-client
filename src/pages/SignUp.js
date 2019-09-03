import React, { useState } from "react";

const SignUp = () => {
  const [state, setState] = useState({
    id: "",
    password: "",
    email: "",
    isIdUnique: false,
    pwCheck: false
  });
  const { id, password, email, isIdUnique, pwCheck } = state;

  const handleClickConfirm = () => {
    if (
      id.length > 0 &&
      password.length > 0 &&
      email.length > 0 &&
      isIdUnique &&
      pwCheck === true
    ) {
      //서버로 user의 정보를 보낸다.
      alert("전송완료");
    } else {
      alert("확인해주세요");
    }
  };

  const handleChangeEmail = () => {
    let email = document.getElementById("email").value;
    setState({
      ...state,
      email: email
    });
  };

  const handleClickIdCheck = () => {
    //서버에 input.value를 body로 post요청을 보내면 서버에서 중복여부에 대한 res를 보내준다.
    //response 값에 따라서 중복이면 이미 있는 id라는 메세지를 dom에서 띄워주고
    //중복이 아니면 id의 state값을 input.value로 설정
    //isIdunique도 true로 설정
    //dom에서도 중복표시에 대한 값을 나타내준다.
  };

  const handleChangeId = () => {
    //id의 input이랑 state의 id 값이 다르면 isIdUnique이 false로 바뀐다.
    //dom에서 아이디 중복확인을 해주세요 라는 문구를 띄운다.
    let inputId = document.getElementById("inputId").value;
    let inputIdCheck = document.getElementById("inputIdCheck");
    if (inputId !== id) {
      setState({
        ...state,
        isIdUnique: false
      });
      inputIdCheck.innerHTML = "중복확인을 해주세요.";
    } else {
      setState({
        ...state,
        isIdUnique: true
      });
      inputIdCheck.innerHTML = "";
    }
  };

  const handleChangePassword = () => {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let confirmMessage = document.getElementById("confirmMessage");

    if (password === confirmPassword) {
      confirmMessage.innerHTML = "패스워드가 일치합니다.";
      setState({
        ...state,
        password: password,
        pwCheck: true
      });
    } else {
      setState({
        ...state,
        pwCheck: false,
        password: ""
      });
      confirmMessage.innerHTML = "패스워드가 일치하지 않습니다.";
    }
  };

  return (
    <div>
      <h3>회원가입</h3>
      <div>
        ID:{" "}
        <input
          placeholder="ID"
          type="text"
          id="inputId"
          onChange={handleChangeId}
        />
        <button onClick={handleClickIdCheck}>중복확인</button>
        <span id="inputIdCheck"></span>
      </div>
      <div>
        PASSWORD: <input placeholder="PASSWORD" type="password" id="password" />
      </div>
      <div>
        CONFIRM PASSWORD:{" "}
        <input
          placeholder="PASSWORD"
          type="password"
          id="confirmPassword"
          onChange={handleChangePassword}
        />
        <span id="confirmMessage">패스워드가 일치하지 않습니다.</span>
      </div>
      <div>
        E-MAIL:{" "}
        <input
          placeholder="E-MAIL"
          type="email"
          id="email"
          onChange={handleChangeEmail}
        />
      </div>
      <div>
        <button onClick={handleClickConfirm}>완료</button>
      </div>
    </div>
  );
};

export default SignUp;

//메일주소 드롭으로 설정
//id 중복체크 (서버에 전송)
//회원정보 서버에 전송
//유효성 검사

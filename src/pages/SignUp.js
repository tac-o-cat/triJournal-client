/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const SignUp = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [idCheck, setIdCheck] = useState(false);
  const [pwCheck, setPwCheck] = useState(false);

  const handleChange = () => {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let confirmMessage = document.getElementById("confirmMessage");

    if (password === confirmPassword) {
      confirmMessage.innerHTML = "패스워드가 일치합니다.";
      setPwCheck(true);
    } else {
      setPwCheck(false);
      confirmMessage.innerHTML = "패스워드가 일치하지 않습니다.";
    }
  };

  return (
    <div>
      <h3>회원가입</h3>
      <div>
        ID: <input placeholder="ID" type="text" />
        <button>중복확인</button>
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
          onChange={handleChange}
        />
        <span id="confirmMessage">패스워드가 일치하지 않습니다.</span>
      </div>
      <div>
        E-MAIL: <input placeholder="E-MAIL" type="email" />
      </div>
      <div>
        <button>완료</button>
      </div>
    </div>
  );
};

export default SignUp;

//메일주소 드롭으로 설정
//id 중복체크
//회원정보 서버에 전송

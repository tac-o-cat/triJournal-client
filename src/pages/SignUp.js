/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button, Input } from "antd";

const SignUp = ({ history }) => {
  const API_HOST_URL = process.env.REACT_APP_API_HOST_URL;
  const [state, setState] = useState({
    id: "",
    password: "",
    email: { id: "", address: "" },
    isIdUnique: false,
    pwCheck: false
  });
  const { id, password, email, isIdUnique, pwCheck } = state;
  const InputGroup = Input.Group;
  const style = { margin: "3px 3px 3px 3px" };
  const handleClickConfirm = () => {
    let userInfo = {
      username: id,
      email: email.id + "@" + email.address,
      password: password,
      userProfilePic: undefined
    };
    fetch(`${API_HOST_URL}/users/signUp`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      alert("가입 완료");
      history.push("/login");
    });
  };

  const handleChangeEmailId = () => {
    let emailId = document.getElementById("emailId").value;
    setState({
      ...state,
      email: { ...email, id: emailId }
    });
  };

  const handleChangeAddress = () => {
    let address = document.getElementById("address").value;
    setState({
      ...state,
      email: { ...email, address: address }
    });
  };

  const handleClickIdCheck = () => {
    let inputId = document.getElementById("inputId").value;
    let username = { username: inputId };
    fetch(`${API_HOST_URL}/users/checkId`, {
      method: "POST",
      body: JSON.stringify(username),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        let message = document.getElementById("inputIdCheck");
        if (!res.isName) {
          setState({
            ...state,
            id: inputId,
            isIdUnique: true
          });
          message.innerHTML = "아이디를 사용하실 수 있습니다.";
        } else {
          message.innerHTML = "이미 존재하는 아이디입니다.";
        }
      })
      .catch(err => console.error(err));
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
    <div
      style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        width: "100%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
      }}
    >
      <h3>회원가입</h3>
      <div>
        <Input
          style={{ ...style, width: "30%" }}
          placeholder="ID"
          type="text"
          id="inputId"
          onChange={handleChangeId}
        />
        <Button style={style} onClick={handleClickIdCheck}>
          중복확인
        </Button>
        <div style={style} id="inputIdCheck"></div>
      </div>
      <div>
        <Input
          style={{ ...style, width: "46%" }}
          placeholder="PASSWORD"
          type="password"
          id="password"
        />
      </div>
      <div>
        <Input
          style={{ ...style, width: "46%" }}
          placeholder="PASSWORD"
          type="password"
          id="confirmPassword"
          onChange={handleChangePassword}
        />
        <div style={style} id="confirmMessage"></div>
      </div>
      <div>
        <InputGroup style={{ ...style, width: "46%", left: "26%" }}>
          <Input
            placeholder="E-MAIL"
            id="emailId"
            style={{ width: "40%" }}
            onChange={handleChangeEmailId}
          />
          <Input
            id="address"
            addonBefore="@"
            style={{ width: "60%" }}
            onChange={handleChangeAddress}
          />
        </InputGroup>
      </div>
      <div>
        <Button
          style={style}
          onClick={handleClickConfirm}
          disabled={
            id.length > 0 &&
            password.length > 0 &&
            email.id.length > 0 &&
            email.address.length > 0 &&
            isIdUnique &&
            pwCheck
              ? false
              : true
          }
        >
          완료
        </Button>
      </div>
    </div>
  );
};

export default SignUp;

//메일주소 드롭으로 설정
//id 중복체크 (서버에 전송)
//회원정보 서버에 전송
//유효성 검사

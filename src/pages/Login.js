/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Icon } from "antd";
const API_HOST_URL = process.env.REACT_APP_API_HOST_URL;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const form = this.props.form;
    let username = form.getFieldValue("id");
    let password = form.getFieldValue("password");
    let body = {
      username: username,
      password: password
    };
    console.log(this.props);
    fetch(`${API_HOST_URL}/sign/signin`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        res.isLogIn
          ? this.props.history.push({
              pathname: "/page/write",
              state: { username: form.getFieldValue("id") }
            })
          : alert("아이디, 비밀번호를 확인하세요");
      })
      .catch(err => console.error(err));
  }
  render() {
    const form = this.props.form;
    const style = { margin: "3px 3px 3px 3px" };
    return (
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          width: "80%",
          transform: "translate(-50%, -50%)",
          textAlign: "center"
        }}
      >
        <h3>triJournal</h3>
        <Form className="login-form">
          {form.getFieldDecorator("id", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              id="id"
              compact="true"
              style={{ ...style, width: "50%" }}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="ID"
            />
          )}
          {form.getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your password!" }]
          })(
            <Input
              id="password"
              compact="true"
              style={{ ...style, width: "50%" }}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="password"
            />
          )}
          <Button
            onClick={this.handleClick}
            style={{ margin: "3px 3px 3px 3px" }}
          >
            Login
          </Button>
        </Form>
        <Link to="/signup">
          <div>Sign Up</div>
        </Link>
        <Link to="/find">
          <div>Find ID/Password</div>
        </Link>
      </div>
    );
  }
}

const WrappedLogin = Form.create({ name: "login" })(Login);

export default WrappedLogin;

//App.js 브라우저라우터 라우터 라우트 링크 데려오기
//App.js에서 라우터를 만든다 => path=/login으로 설정
//Component의 Attribute는 Login으로 설정
//Login.js 페이지에서 Id - <input> , pw - < input> , login - <button>, join - <div>, find - <div>
//API
//Login 클릭핳 때 post 요청

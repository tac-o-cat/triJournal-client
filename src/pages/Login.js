/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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
    console.log(body);
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
          ? this.props.history.push("/page/write")
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

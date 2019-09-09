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
  handleClick(e) {
    const form = this.props.form;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        let username = values.id;
        let password = values.password;
        let body = {
          username: username,
          password: password
        };
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
    });
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
        <Form className="login-form" onSubmit={this.handleClick}>
          <Form.Item>
            <h3>triJournal</h3>
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator("id", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                id="id"
                compact="true"
                style={{ ...style, width: "50%" }}
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="ID"
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {form.getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(
              <Input.Password
                compact="true"
                style={{ ...style, width: "50%" }}
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" style={{ margin: "3px 3px 3px 3px" }}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <Form.Item>
          <div>
            <Link to="/signup">Sign Up</Link>
          </div>
          <div>
            <Link to="/find">Find ID/Password</Link>
          </div>
        </Form.Item>
      </div>
    );
  }
}

const WrappedLogin = Form.create({ name: "login" })(Login);

export default WrappedLogin;

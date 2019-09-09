/* eslint-disable react/prop-types */
import React from "react";
import { Button, Input, Form, Icon } from "antd";
//import { debounce } from "underscore";
const API_HOST_URL = process.env.REACT_APP_API_HOST_URL;

//underscore의 debounce를 써야 할 것 같은데, 어떻게 걸어야할지?
//유효성 검사는 어떻게?

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickConfirm = this.handleClickConfirm.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
    this.checkUniqueId = this.checkUniqueId.bind(this);
    this.checkUniqueEmail = this.checkUniqueEmail.bind(this);
    this.state = {
      isIdUnique: false,
      pwCheck: false,
      isEmailUnique: false
    };
  }
  handleClickConfirm(e) {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        let userInfo = {
          username: values.id,
          email: values.email,
          password: values.password,
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
          this.props.history.push("/login");
        });
      }
    });
  }

  checkUniqueId(rule, value, callback) {
    let username = { username: value };
    fetch(`${API_HOST_URL}/users/checkId`, {
      method: "POST",
      body: JSON.stringify(username),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.isName) {
          callback("이미 존재하는 아이디입니다");
          this.setState({ isIdUnique: false });
        } else if (value.length && !res.isName) {
          callback();
          this.setState({ isIdUnique: true });
        }
      });
  }

  async checkUniqueEmail(rule, value, callback) {
    let email = { email: value };
    await fetch(`${API_HOST_URL}/users/findId`, {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.username) {
          callback("이미 사용 중인 메일입니다");
          this.setState({ isEmailUnique: false });
        } else if (value.length && !res.username) {
          this.setState({ isEmailUnique: true });
        } else if (!value.lenght) {
          callback("메일 주소를 입력해 주세요.");
        }
      });
  }

  validateToNextPassword(rule, value, callback) {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  }
  compareToFirstPassword(rule, value, callback) {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
      this.setState({
        pwCheck: false
      });
    } else {
      callback();
      this.setState({
        pwCheck: true
      });
    }
  }

  render() {
    const form = this.props.form;
    const style = { margin: "3px 3px 3px 3px" };
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
        <Form className="signUp-form" onSubmit={this.handleClickConfirm}>
          <Form.Item>
            <h3>회원가입</h3>
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator("id", {
              rules: [
                { required: true, message: "Please input your username!" },
                { validator: this.checkUniqueId }
              ]
            })(
              <Input
                compact="true"
                style={{ ...style, width: "35%" }}
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="ID"
              />
            )}
            <div style={style} id="inputIdCheck"></div>
          </Form.Item>
          <Form.Item>
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
                style={{ ...style, width: "50%" }}
                prefix={
                  <Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input.Password
                style={{ ...style, width: "50%" }}
                prefix={
                  <Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Password"
              />
            )}
            <div style={style} id="confirmMessage"></div>
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator("email", {
              rules: [
                {
                  validator: this.checkUniqueEmail
                }
              ]
            })(
              <Input
                style={{ width: "50%" }}
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="email"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={style} htmlType="submit">
              완료
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedSignUp = Form.create({ name: "signUp" })(SignUp);

export default WrappedSignUp;

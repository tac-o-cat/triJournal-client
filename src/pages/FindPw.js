/* eslint-disable react/prop-types */
import React from "react";
import { Form, Input, Button, Icon } from "antd";
const API_HOST_URL = process.env.REACT_APP_API_HOST_URL;
const InputGroup = Input.Group;

class FindPw extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const form = this.props.form;
    let emailId = form.getFieldValue("emailId");
    let address = form.getFieldValue("address");
    let email = { email: `${emailId}@${address}` };
    fetch(`${API_HOST_URL}/users/findPassword`, {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        let message = document.getElementById("message");
        if (res.password) {
          message.innerHTML = `회원님의 비밀번호는 ${res.password}입니다.`;
        } else {
          message.innerHTML = "해당 이메일로 가입한 아이디가 없습니다.";
        }
      })
      .catch(err => console.error(err));
  }
  render() {
    const form = this.props.form;
    const style = { margin: "3px 3px 3px 3px" };
    return (
      <Form
        className="login-form"
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          width: "80%",
          transform: "translate(-50%, -50%)",
          textAlign: "center"
        }}
      >
        <div style={style}>아이디와 이메일을 입력해 주세요.</div>
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
        <InputGroup compact>
          {form.getFieldDecorator("emailId", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<Input id="emailId" style={{ width: "45%" }} addonAfter="@" />)}
          {form.getFieldDecorator("address", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<Input id="address" style={{ width: "55%" }} />)}
        </InputGroup>
        <div id="message"></div>
        <Button
          type="primary"
          style={style}
          onClick={this.handleClick}
          disabled={
            form.isFieldTouched("id") &&
            form.isFieldTouched("emailId") &&
            form.isFieldTouched("address")
              ? false
              : true
          }
        >
          완료
        </Button>
      </Form>
    );
  }
}
const WrappedFindPw = Form.create({ name: "find_pw" })(FindPw);

export default WrappedFindPw;

/* eslint-disable react/prop-types */
import React from "react";
import { Form, Input, Button } from "antd";
const API_HOST_URL = process.env.REACT_APP_API_HOST_URL;
const InputGroup = Input.Group;

class FindId extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const form = this.props.form;
    let emailId = form.getFieldValue("emailId");
    let address = form.getFieldValue("address");
    let email = { email: `${emailId}@${address}` };
    fetch(`${API_HOST_URL}/users/findId`, {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        let message = document.getElementById("message");
        if (res.username) {
          message.innerHTML = `회원님의 아이디는 ${res.username}입니다.`;
        } else {
          message.innerHTML = "해당 이메일로 가입한 아이디가 없습니다.";
        }
      })
      .catch(err => console.error(err));
  }
  render() {
    const form = this.props.form;
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
        <div style={{ margin: "3px 3px 3px 3px" }}>이메일을 입력해 주세요.</div>
        <InputGroup compact style={{ margin: "3px 3px 3px 3px" }}>
          {form.getFieldDecorator("emailId", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              id="emailId"
              style={{ width: "45%" }}
              placeholder="e-mail ID"
              addonAfter="@"
            />
          )}
          {form.getFieldDecorator("address", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<Input id="address" style={{ width: "55%" }} />)}
        </InputGroup>
        <div id="message"></div>
        <Button
          type="primary"
          onClick={this.handleClick}
          disabled={
            form.isFieldTouched("emailId") && form.isFieldTouched("address")
              ? false
              : true
          }
          style={{ margin: "3px 3px 3px 3px" }}
        >
          완료
        </Button>
      </Form>
    );
  }
}

const WrappedFindId = Form.create({ name: "find_id" })(FindId);

export default WrappedFindId;

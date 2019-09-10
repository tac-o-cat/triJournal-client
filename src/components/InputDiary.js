/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Input, Button, Form } from "antd";

class InputDiary extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields(async (err, values) => {
      let diary = {
        best: values.best,
        worst: values.worst,
        todo: values.todo,
        longLog: undefined,
        picUrl: values.image,
        userName: this.props.username
      };
      this.props.postDiary(diary);
    });
  }
  render() {
    const form = this.props.form;
    const style = { margin: "3px 3px 3px 3px" };
    return (
      <div style={{ width: "50%", margin: "0 50px 0 50px" }}>
        <Form onSubmit={this.handleClick}>
          <Form.Item>
            {form.getFieldDecorator("best", {
              rules: [
                {
                  required: true,
                  message: "오늘 가장 좋았던 일은 무엇이었나요?"
                }
              ]
            })(
              <Input
                id="best"
                style={style}
                placeholder="오늘 가장 좋았던 일"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator("worst", {
              rules: [
                { required: true, message: "오늘 무엇이 가장 힘들었나요?" }
              ]
            })(
              <Input
                id="worst"
                style={style}
                placeholder="오늘 가장 나빴던 일"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator("todo", {
              rules: [{ required: true, message: "내일 할 일은?" }]
            })(<Input id="todo" style={style} placeholder="내일 할 일" />)}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" style={style}>
              작성
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedInputDiary = Form.create({ name: "input_diary" })(InputDiary);

export default WrappedInputDiary;
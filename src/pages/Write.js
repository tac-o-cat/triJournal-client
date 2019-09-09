/* eslint-disable react/prop-types */
import React from "react";
import { Input, Button, Empty, Form } from "antd";
import Diary from "./Diary";
import UploadImage from "./UploadImage";
const API_HOST_URL = process.env.REACT_APP_API_HOST_URL;

class Write extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.deleteDiary = this.deleteDiary.bind(this);
    // this.editDiary = this.deleteDiary.bind(this);
    this.state = {
      loading: true,
      diaries: [{ init: true }],
      currentUser: ""
    };
  }

  async fetchDiary() {
    console.log(this.props.username, "username");
    if (this.props.username) {
      let writtenDaries = await fetch(
        `${API_HOST_URL}/posts/${this.props.username}`
      ).then(res => res.json());
      this.setState({ diaries: writtenDaries, loading: false });
    }
  }
  componentDidMount() {
    this.fetchDiary();
  }
  handleClick() {
    //서버로 post 요청을 보낸다.
    console.log(this.props.username);
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
      await fetch(`${API_HOST_URL}/posts/${this.props.username}`, {
        method: "POST",
        body: JSON.stringify(diary),
        headers: {
          "Content-Type": "application/json"
        }
      });
      let loadNewDiary = await fetch(
        `${API_HOST_URL}/posts/${this.props.username}`
      ).then(res => res.json());
      this.setState({
        diaries: this.state.diaries.concat(
          loadNewDiary[loadNewDiary.length - 1]
        )
      });
    });
  }
  async deleteDiary(username, postId) {
    await fetch(`${API_HOST_URL}/posts/${username}/${postId}`, {
      method: "DELETE"
    });
    let loadNewDiary = await fetch(`${API_HOST_URL}/posts/${username}`).then(
      res => res.json()
    );
    this.setState({ diaries: loadNewDiary });
  }

  // editDiary(postId, body) {
  //   const { form } = this.props;
  //   form.validateFields(async (err, values) => {
  //     await fetch(`${API_HOST_URL}/posts/${this.props.username}/${postId}`, {
  //       method: "PUT",
  //       body: JSON.stringify(body),
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     }).then(res => res.json());

  //     let loadNewDiary = await fetch(
  //       `${API_HOST_URL}/posts/${this.props.username}`
  //     ).then(res => res.json());
  //     this.setState({ diaries: loadNewDiary });
  //   });
  // }
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
            <UploadImage />
          </Form.Item>
        </Form>
        {!this.state.diaries.length && !this.state.loading ? ( // 들어온 다이어리에 id가 없다면 초기에 설정해준 빈 오브젝트이므로
          <Empty // Empty를 랜더한다.
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>첫 번째 일기를 써보세요!</span>}
          />
        ) : (
          this.state.diaries
            .sort((a, b) => b.id - a.id)
            .slice(0, 10)
            .map((diary, i) => {
              return (
                <Diary
                  diary={diary}
                  loading={this.state.loading}
                  key={i}
                  deleteDiary={this.deleteDiary}
                  // editDiary={this.editDiary}
                />
              );
            })
        )}
      </div>
    );
  }
}

const WrappedWrite = Form.create({ name: "write" })(Write);

export default WrappedWrite;

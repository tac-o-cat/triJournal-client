/* eslint-disable react/prop-types */
import React from "react";
import { Modal, Input } from "antd";

const Edit = props => {
  const handleOk = () => {
    // 모달창을 닫는다.
    props.hideModal();
    // 모달 창의 수정된 value를 가져온다.
    // let editBest = document.getElementById("editBest").value;
    // let editWorst = document.getElementById("editWorst").value;
    // let editTodo = document.getElementById("editTodo").value;
    // 수정된 value를 서버로 보낸다.
    // 수정 사항을 타임라인에 어떻게 반영?
  };

  const handleCancel = () => {
    props.hideModal();
  };
  return (
    <Modal
      title={props.diary.createdAt.slice(0, 10)}
      visible={props.isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input
        id="editBest"
        placeholder="오늘 가장 좋았던 일"
        defaultValue={props.diary.best}
      />
      <Input
        id="editWorst"
        placeholder="오늘 가장 나빴던 일"
        defaultValue={props.diary.worst}
      />
      <Input
        id="editTodo"
        placeholder="내일 할 일"
        defaultValue={props.diary.todo}
      />
    </Modal>
  );
};

export default Edit;

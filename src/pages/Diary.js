/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Card, Icon, Popconfirm, message } from "antd";
import Edit from "./Edit";

const Diary = props => {
  const { Meta } = Card;
  const [isVisible, setIsVisible] = useState(false);
  const handleConfirmDelete = () => {
    message.success("삭제 완료");
    props.deleteDiary(props.diary.userName, props.diary.id);
  };
  const handleCancelDelete = () => {
    message.error("삭제 취소");
  };
  const handleClickEdit = () => {
    setIsVisible(true);
  };
  const hideModal = () => {
    setIsVisible(false);
  };
  return (
    <Card
      style={{ width: 400, margin: "1% 1% 1% 1%" }}
      loading={props.loading}
      cover={
        props.diary.image ? (
          <img alt={props.diary.createdAt} src={props.diray.image} />
        ) : (
          undefined
        )
      }
      actions={[
        <Icon type="edit" key="edit" onClick={handleClickEdit} />,
        <Popconfirm
          key="delete"
          title="일기를 지우시겠습니까?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          okText="Yes"
          cancelText="No"
        >
          <Icon type="delete" key="delete" />
        </Popconfirm>,
        <Icon type="file-text" key="file-text" />
      ]}
    >
      {props.loading ? (
        <Meta />
      ) : (
        <Meta
          title={props.diary.createdAt.slice(0, 10)}
          description={
            <div>
              <p>1. {props.diary.best}</p>
              <p>2. {props.diary.worst}</p>
              <p>3. {props.diary.todo}</p>
            </div>
          }
        />
      )}
      <Edit
        isVisible={isVisible}
        hideModal={hideModal}
        diary={props.diary}
        editDiary={props.editDiary}
      />
    </Card>
  );
};

export default Diary;

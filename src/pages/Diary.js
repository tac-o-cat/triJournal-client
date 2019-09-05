/* eslint-disable react/prop-types */
import React from "react";
import { Card, Icon } from "antd";

const Diary = props => {
  const { Meta } = Card;
  const date = props.diary.createdAt.slice(0, 10);
  return (
    <Card
      style={{ width: 400 }}
      loading={props.loading}
      cover={
        props.diary.image ? (
          <img alt={props.diary.createdAt} src={props.diray.image} />
        ) : (
          undefined
        )
      }
      actions={[
        <Icon type="edit" key="edit" />,
        <Icon type="delete" key="delete" />,
        <Icon type="file-text" key="file-text" />
      ]}
    >
      {props.loading ? (
        <Meta />
      ) : (
        <Meta
          title={date}
          description={
            <div>
              <p>1. {props.diary.title}</p>
              <p>2. {props.diary.title}</p>
              <p>3. {props.diary.title}</p>
            </div>
          }
        />
      )}
    </Card>
  );
};

export default Diary;

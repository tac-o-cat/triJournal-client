import React from "react";
import { Card, Icon } from "antd";

const LoadingDiary = () => {
  return (
    <div>
      <Card
        style={{ width: 400, marginTop: 5 }}
        loading={true}
        actions={[
          <Icon type="delete" key="delete" />,
          <Icon type="edit" key="edit" />,
          <Icon type="ellipsis" key="ellipsis" />
        ]}
      />
    </div>
  );
};

export default LoadingDiary;

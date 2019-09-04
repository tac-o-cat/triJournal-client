import React from "react";
import { Upload, Icon, Button } from "antd";

const AttachImage = props => {
  const img = {
    action: "//jsonplaceholder.typicode.com/posts/",
    listType: "picture",
    previewFile(file) {
      console.log("Your upload file:", file);
      // Your process logic. Here we just mock to the same file
      return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
        method: "POST",
        body: file
      })
        .then(res => res.json())
        .then(({ thumbnail }) => thumbnail);
    },
    onChange() {
      // 하나만 올리도록 제한하는 방법 알아보기(https://stackoverflow.com/questions/44332630/single-ant-upload-list-item-only)
    },
    onRemove() {
      // eslint-disable-next-line react/prop-types
      props.setImage(undefined);
    }
  };
  return (
    <div>
      <Upload {...img}>
        <Button>
          <Icon type="upload" /> Upload
        </Button>
      </Upload>
    </div>
  );
};

export default AttachImage;

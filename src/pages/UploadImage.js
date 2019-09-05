import React from "react";
import { Upload, Icon, Button } from "antd";

const UploadImage = props => {
  const img = {
    action: "//jsonplaceholder.typicode.com/posts/", //사진을 올릴 URL
    listType: "picture", // 프리뷰 모양
    previewFile(file) {
      console.log("Your upload file:", file);
      // 파일 프리뷰 부분. 서버 측에서 업로드한 파일의 주소를 thumbnail이라는 key로 돌려주도록 향후 수정
      return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
        method: "POST",
        body: file
      })
        .then(res => res.json())
        .then(({ thumbnail }) => thumbnail);
    },
    onChange(info) {
      let fileList = info.fileList;
      fileList = fileList.slice(-1); // fileList의 lengt를 1로 고정. 최근 업로드된 파일만 남아있음.
      fileList = fileList.map(file => {
        if (file.response) {
          // 서버로부터 response가 있으면,
          // response.url을 file.url로 설정해준다. 이 부분 덕분에 업로드된 파일을 클릭하면 사진을 확대해서 볼 수 있음.
          file.url = file.response.url;
        }
        return file;
      });
      // eslint-disable-next-line react/prop-types
      props.setImage(fileList); // 상위 컴포넌트 Write의 image state에 업로드한 파일을 넣어줌.
    },
    onRemove() {
      // 삭제 버틀을 누를 경우 상위 컴포넌트 write의 state가 undefined가 됨.
      // eslint-disable-next-line react/prop-types
      props.setImage(undefined);
    }
  };
  return (
    <span>
      {/* eslint-disable-next-line react/prop-types*/}
      <Upload {...img} fileList={props.currentImage}>
        <Button>
          <Icon type="upload" /> Upload
        </Button>
      </Upload>
    </span>
  );
};

export default UploadImage;

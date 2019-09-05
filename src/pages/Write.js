import React, { useState } from "react";
import { Input, Button } from "antd";
import setDataToState from "../modules/setDataToState";
import UploadImage from "./UploadImage";

const Write = () => {
  const style = {
    margin: "3px 3px 3px 3px"
  };
  const [journal, setJournal] = useState({
    best: "",
    worst: "",
    todo: "",
    image: undefined
  });
  const { best, worst, todo, image } = journal;
  const handleChange = e => {
    setDataToState(e.target.id, setJournal, journal);
  };
  const handleClick = () => {
    // 서버로 post 요청을 보낸다.
  };
  const setImage = file => {
    setJournal({ ...journal, image: file });
  };
  return (
    <div style={{ width: "50%", margin: "0 50px 0 50px" }}>
      <Input
        id="best"
        onChange={handleChange}
        style={style}
        placeholder="오늘 가장 좋았던 일"
      />
      <Input
        id="worst"
        onChange={handleChange}
        style={style}
        placeholder="오늘 가장 나빴던 일"
      />
      <Input
        id="todo"
        onChange={handleChange}
        style={style}
        placeholder="내일 할 일"
      />
      <div style={{ textAlign: "right" }}>
        <Button
          onClick={handleClick}
          style={style}
          disabled={best.length && worst.length && todo.length ? false : true}
        >
          작성
        </Button>
        <UploadImage setImage={setImage} currentImage={image} />
      </div>
    </div>
  );
};

export default Write;

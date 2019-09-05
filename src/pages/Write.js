import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import setDataToState from "../modules/setDataToState";
import Diary from "./Diary";
import LoadingDiary from "./LoadingDiary";

const Write = () => {
  const style = {
    margin: "3px 3px 3px 3px"
  };
  const InputGroup = Input.Group;
  const [loading, setLoading] = useState(true);
  const [diaries, setDiaries] = useState([]);
  const [journal, setJournal] = useState({
    best: "",
    worst: "",
    todo: "",
    image: undefined
  });

  const { best, worst, todo } = journal;

  const fetchDiary = async () => {
    const diaries = await fetch("https://koreanjson.com/todos").then(res =>
      res.json()
    );
    setDiaries(diaries);
  };
  useEffect(() => {
    fetchDiary();
    setLoading(false);
  }, []);
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

      <InputGroup style={{ width: "70%" }}>
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
      </InputGroup>
      <Button
        onClick={handleClick}
        style={style}
        disabled={best.length && worst.length && todo.length ? false : true}
      >
        작성
      </Button>
      {loading ? (
        <LoadingDiary style={style} />
      ) : (
        diaries
          .slice(0, 10)
          .map(diary => <Diary diary={diary} key={diary.id} />)
      )}
    </div>
  );
};

export default Write;

/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Input, Button, Empty } from "antd";
import setDataToState from "../modules/setDataToState";
import Diary from "./Diary";
import UploadImage from "./UploadImage";
const API_HOST_URL = process.env.REACT_APP_API_HOST_URL;

const Write = props => {
  const style = {
    margin: "3px 3px 3px 3px"
  };
  const InputGroup = Input.Group;
  const [loading, setLoading] = useState(true);
  const [diaries, setDiaries] = useState([{}]);
  const [journal, setJournal] = useState({
    best: "",
    worst: "",
    todo: "",
    image: undefined
  });
  const { best, worst, todo, image } = journal;
  const fetchDiary = async () => {
    if (props.username) {
      let writtenDaries = await fetch(
        `${API_HOST_URL}/posts/${props.username}`
      ).then(res => res.json());
      if (Array.isArray(writtenDaries)) setDiaries(writtenDaries);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDiary(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = e => {
    setDataToState(e.target.id, setJournal, journal);
  };
  const handleClick = async () => {
    //서버로 post 요청을 보낸다.
    let diary = {
      best: best,
      worst: worst,
      todo: todo,
      longLog: undefined,
      picUrl: image,
      userName: props.username
    };
    await fetch(`${API_HOST_URL}/posts/${props.username}`, {
      method: "POST",
      body: JSON.stringify(diary),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let loadNewDiary = await fetch(`${API_HOST_URL}/posts/mini1`).then(res =>
      res.json()
    );
    setDiaries([...diaries, loadNewDiary[loadNewDiary.length - 1]]);
    let bestInput = document.getElementById("best");
    let worstInput = document.getElementById("worst");
    let todoInput = document.getElementById("todo");
    bestInput.value = "";
    worstInput.value = "";
    todoInput.value = "";
  };
  const setImage = file => {
    setJournal({ ...journal, image: file });
  };
  return (
    <div style={{ width: "50%", margin: "0 50px 0 50px" }}>
      <InputGroup style={{ width: "70%" }}>
        <Input
          id="best"
          onChange={handleChange}
          style={style}
          placeholder="오늘 가장 좋았던 일"
        />
        <Input
          id="worst"
          onChange={handleChange}
          style={style}
          placeholder="오늘 가장 나빴던 일"
        />{" "}
        <Input
          id="todo"
          onChange={handleChange}
          style={style}
          placeholder="내일 할 일"
        />
      </InputGroup>
      <Button
        onClick={handleClick}
        style={style}
        disabled={best.length && worst.length && todo.length ? false : true}
      >
        작성
      </Button>
      <UploadImage setImage={setImage} currentImage={image} />
      {!diaries[0].id && !loading ? ( // 들어온 다이어리에 id가 없다면 초기에 설정해준 빈 오브젝트이므로
        <Empty // Empty를 랜더한다.
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>첫 번째 일기를 써보세요!</span>}
        />
      ) : (
        diaries.slice(diaries.length - 10).map((diary, i, tenDiaries) => {
          console.log(tenDiaries);
          let diaryIndex = tenDiaries.length - 1;
          console.log(diaryIndex);
          return (
            <Diary
              diary={tenDiaries[diaryIndex - i]}
              loading={loading}
              key={i}
            />
          );
        })
      )}
    </div>
  );
};

export default Write;

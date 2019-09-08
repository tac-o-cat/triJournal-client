/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Diary from "./Diary";
import { Pagination, Empty } from "antd";
const API_HOST_URL = process.env.REACT_APP_API_HOST_URL;

const List = props => {
  const [loading, setLoading] = useState(true);
  const [diaries, setDiaries] = useState([{ init: true }]);
  const [numOfItems, setNumOfItems] = useState({ minValue: 0, maxValue: 10 });
  const { minValue, maxValue } = numOfItems;

  const fetchDiary = async () => {
    if (props.username) {
      let writtenDaries = await fetch(
        `${API_HOST_URL}/posts/${props.username}`
      ).then(res => res.json());
      setDiaries(writtenDaries);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDiary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = page => {
    console.log(page);
    setNumOfItems({ minValue: (page - 1) * 10, maxValue: page * 10 });
  };
  const deleteDiary = async (username, postId) => {
    await fetch(`${API_HOST_URL}/posts/${username}/${postId}`, {
      method: "DELETE"
    });
    let loadNewDiary = await fetch(`${API_HOST_URL}/posts/${username}`).then(
      res => res.json()
    );
    setDiaries(loadNewDiary);
  };
  const editDiary = async (postId, body) => {
    await fetch(`${API_HOST_URL}/posts/${props.username}/${postId}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json());

    let loadNewDiary = await fetch(
      `${API_HOST_URL}/posts/${props.username}`
    ).then(res => res.json());
    setDiaries(loadNewDiary);
  };
  return (
    <div>
      {!diaries.length && !loading ? ( // 들어온 다이어리에 id가 없다면 초기에 설정해준 빈 오브젝트이므로
        <Empty // Empty를 랜더한다.
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>첫 번째 일기를 써보세요!</span>}
        />
      ) : (
        diaries
          .sort((a, b) => b.id - a.id) // [11,10,9,8,7,6,5,4,3,2,1,0]
          .slice(minValue, maxValue) //[11,10,9,8,7,6,5,4,3,2]
          .map((diary, i) => {
            return (
              <Diary
                diary={diary}
                loading={loading}
                key={i}
                deleteDiary={deleteDiary}
                editDiary={editDiary}
              />
            );
          })
      )}
      <Pagination
        size="small"
        hideOnSinglePage={true}
        pageSize={10}
        onChange={handleChange}
        total={diaries.length}
      ></Pagination>
    </div>
  );
};

export default List;

import React, { useState, useEffect } from "react";
import Diary from "./Diary";
import LoadingDiary from "./LoadingDiary";
import { Pagination } from "antd";

const List = () => {
  const [loading, setLoading] = useState(true);
  const [numOfItems, setNumOfItems] = useState({ minValue: 0, maxValue: 10 });
  const { minValue, maxValue } = numOfItems;
  const [diaries, setDiaries] = useState([]);
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
  const handleChange = page => {
    if (page <= 1) {
      setNumOfItems({
        minValue: 0,
        maxValue: 10
      });
    }
    if (page > 1) {
      setNumOfItems({ minValue: (page - 1) * 10, maxValue: page * 10 });
    }
  };
  return (
    <div>
      {console.log(diaries.length)}
      {loading ? (
        <LoadingDiary />
      ) : (
        diaries
          .slice(minValue, maxValue)
          .map(diary => <Diary diary={diary} key={diary.id} />)
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

import React, { useState, useEffect } from "react";
import Diary from "./Diary";
import { Pagination, Empty } from "antd";

const List = () => {
  const [loading, setLoading] = useState(true);
  const [numOfItems, setNumOfItems] = useState({ minValue: 0, maxValue: 10 });
  const { minValue, maxValue } = numOfItems;
  const [diaries, setDiaries] = useState([{}]);
  const fetchDiary = async () => {
    const diaries = await fetch("https://koreanjson.com/todos").then(res =>
      res.json()
    );
    setDiaries(diaries);
    setLoading(false);
  };
  useEffect(() => {
    fetchDiary();
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
      {!diaries[0].id && !loading ? ( // 들어온 다이어리에 id가 배정되어 있지 않다면 초기에 스테이트로 설정된 빈 오브젝트이므로
        <Empty // Empty 컴포넌트 돌려줌.
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>첫 번째 일기를 써보세요!</span>}
        />
      ) : (
        diaries
          .slice(minValue, maxValue)
          .map((diary, i) => <Diary diary={diary} loading={loading} key={i} />)
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

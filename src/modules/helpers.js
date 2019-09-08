const helpers = {
  setDataToState: (elementId, setter, state) => {
    let data = document.getElementById(elementId).value;
    setter({ ...state, [elementId]: data });
  },
  deleteDiary: async (username, postId) => {
    // 일기 삭제, 수정 등의 펑션은 여기로 빼고 싶다. 나중에?
    console.log(username, postId);
  }
};

export default helpers;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "react-sidebar";

const NavBar = () => {
  const [menuOpenState, setMenuOpenState] = useState({
    sidebarOpen: true,
    logout: false
  });
  const { sidebarOpen } = menuOpenState;

  const onSetSidebarOpen = open => {
    setMenuOpenState({
      ...menuOpenState,
      sidebarOpen: open
    });
  };

  const handleClickLogout = () => {
    //로그아웃 버튼을 클릭하면 서버에 post요청을 보낸다.
    //보낼 값은 아이디
    //서버에서 아이디와 맞다는 응답이 오면
    //로그인 페이지로 이동
    alert("로그아웃 되었습니다.");
    setMenuOpenState({
      ...menuOpenState,
      logout: true
    });
  };
  return (
    <Sidebar
      sidebar={
        <div>
          <div>
            <h3>
              환영합니다, Obok님!
              <button onClick={handleClickLogout}>Logout</button>
            </h3>
          </div>
          <div>
            <NavLink exact to="/write">
              일기쓰기
            </NavLink>
            <NavLink exact to="/list">
              리스트
            </NavLink>
            <NavLink exact to="/search">
              검색
            </NavLink>
            <NavLink exact to="/favorite">
              즐겨찾기
            </NavLink>
            <NavLink exact to="/myInfo">
              마이페이지
            </NavLink>
          </div>
        </div>
      }
      open={sidebarOpen}
      onSetOpen={onSetSidebarOpen}
      styles={{ sidebar: { background: "white", width: "500px" } }}
    >
      <button onClick={() => onSetSidebarOpen(true)}>Open sidebar</button>
    </Sidebar>
  );
};

export default NavBar;

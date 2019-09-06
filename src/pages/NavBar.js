/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "react-sidebar";
import { Menu, Icon, Button } from "antd";

const { SubMenu } = Menu;

const NavBar = () => {
  const [menuOpenState, setMenuOpenState] = useState({
    sidebarOpen: false,
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
              <p
                style={{
                  margin: "0 250px 0 10px",
                  float: "left",
                  overflow: "hidden"
                }}
              >
                환영합니다, Obok님!
              </p>
              <Button
                type="primary"
                onClick={handleClickLogout}
                style={{ float: "left", margin: "15px 0 0 0 " }}
              >
                Logout
              </Button>
            </h3>
          </div>
          <div>
            <Menu mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <NavLink to="/page/write">
                  <p>일기쓰기</p>
                </NavLink>
              </Menu.Item>
            </Menu>
            <Menu mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <NavLink to="/page/list">
                  <p>리스트</p>
                </NavLink>
              </Menu.Item>
            </Menu>
            <Menu mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <NavLink to="/page/search">
                  <p>검색</p>
                </NavLink>
              </Menu.Item>
            </Menu>
            <Menu mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <NavLink to="/page/favorite">
                  <p>즐겨찾기</p>
                </NavLink>
              </Menu.Item>
            </Menu>
            <Menu mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <NavLink to="/page/myInfo">
                  <p>마이페이지</p>
                </NavLink>
              </Menu.Item>
            </Menu>
          </div>
        </div>
      }
      open={sidebarOpen}
      onSetOpen={onSetSidebarOpen}
      styles={{
        sidebar: {
          zIndex: sidebarOpen ? "5" : "-1"
        }
      }}
    >
      <Icon type="menu" onClick={() => onSetSidebarOpen(true)} />
    </Sidebar>
  );
};

export default NavBar;

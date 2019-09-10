/* eslint-disable react/prop-types */
import React from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "react-sidebar";
import { Menu, Icon, Button } from "antd";

const NavBar = props => {
  console.log(props);
  const menuList = [
    { title: "일기쓰기", path: "/page/write" },
    { title: "리스트", path: "/page/list" },
    { title: "검색", path: "/page/search" },
    { title: "즐겨찾기", path: "/page/favorite" },
    { title: "마이페이지", path: "/page/myInfo" }
  ];
  const onSetSidebarOpen = () => {
    props.setSidebarOpen();
  };

  const handleClickLogout = () => {
    //로그아웃 버튼을 클릭하면 서버에 post요청을 보낸다.
    //보낼 값은 아이디
    //서버에서 아이디와 맞다는 응답이 오면
    //로그인 페이지로 이동
    alert("로그아웃 되었습니다.");
    props.setLogout();
  };

  return (
    <Sidebar
      sidebar={
        <div
          style={{
            height: "100%",
            background: "#fff"
          }}
        >
          <div
            style={{
              width: "100%",
              height: "10%",
              overflow: "hidden"
            }}
          >
            <h3>
              <p
                style={{
                  width: "70%",
                  float: "left",
                  display: "inline-block",
                  paddingLeft: "2%",
                  marginTop: "1%"
                }}
              >
                환영합니다, Obok님!
              </p>
            </h3>
            <Button
              type="primary"
              onClick={handleClickLogout}
              style={{ float: "left", marginTop: "2.5%", marginLeft: "5%" }}
            >
              Logout
            </Button>
          </div>
          <div>
            <Menu mode="inline" defaultSelectedKeys={["0"]}>
              {menuList.map((menu, i) => {
                return (
                  <Menu.Item key={i}>
                    <NavLink to={menu.path}>
                      <p>{menu.title}</p>
                    </NavLink>
                  </Menu.Item>
                );
              })}
            </Menu>
          </div>
        </div>
      }
      open={props.sidebarOpen}
      onSetOpen={onSetSidebarOpen}
      styles={{
        sidebar: {
          zIndex: props.sidebarOpen ? "5" : "-1",
          width: "60%"
        }
      }}
    >
      <Icon type="menu" onClick={() => onSetSidebarOpen()} />
    </Sidebar>
  );
};

export default NavBar;

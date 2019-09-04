import React, { useState } from "react";
import { Input, Button } from "antd";

const FindPw = () => {
  const InputGroup = Input.Group;
  const [user, setUser] = useState({ emailId: "", address: "", id: "" });
  const { emailId, address, id } = user;
  const handleChangeId = () => {
    let id = document.getElementById("id").value;
    setUser({ ...user, id: id });
  };
  const handleChangeEmailId = () => {
    let emailId = document.getElementById("emailId").value;
    setUser({ ...user, emailId: emailId });
  };
  const handleChangeAddress = () => {
    let address = document.getElementById("address").value;
    setUser({ ...user, address: address });
  };
  const handleClick = () => {
    // 유저 아이디와 이메일을 body에 담아 서버에 포스트 요청을 보낸다.
    // pw를 바로 받는 방법? 서버에서 인증 이메일을 보내는 방법? 논의 필요함.
  };
  return (
    <div
      style={{
        position: "absolute",
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
      }}
    >
      <div style={{ margin: "3px 3px 3px 3px" }}>
        아이디와 이메일을 입력해 주세요.
      </div>
      <Input
        id="id"
        compact="true"
        placeholder="아이디"
        style={{ width: "40%", margin: "3px 3px 3px 3px" }}
        onChange={handleChangeId}
      />
      <InputGroup compact style={{ margin: "3px 3px 3px 3px" }}>
        <Input
          id="emailId"
          style={{ width: "45%" }}
          addonAfter="@"
          onChange={handleChangeEmailId}
        />
        <Input
          id="address"
          style={{ width: "55%" }}
          onChange={handleChangeAddress}
        />
      </InputGroup>
      <Button
        style={{ margin: "3px 3px 3px 3px" }}
        type="primary"
        onClick={handleClick}
        disabled={id.length && emailId.length && address.length ? false : true}
      >
        완료
      </Button>
    </div>
  );
};

export default FindPw;

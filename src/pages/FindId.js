import React, { useState } from "react";
import { Input, Button } from "antd";

const FindId = () => {
  const InputGroup = Input.Group;
  const [email, setEmail] = useState({ id: "", address: "" });
  const { id, address } = email;
  const handleChangeId = () => {
    let id = document.getElementById("id").value;
    setEmail({ ...email, id: id });
  };
  const handleChangeAddress = () => {
    let address = document.getElementById("address").value;
    setEmail({ ...email, address: address });
  };
  const handleClick = () => {
    // email을 body에 담아 서버에 포스트 요청을 보낸다.
    // id가 리스폰스로 오면, 해당 응답을 message div에 출력한다.
    let message = document.getElementById("message");
    message.innerHTML = "해당 이메일로 가입한 아이디가 없습니다.";
  };
  return (
    <div>
      <div>이메일을 입력해 주세요.</div>
      <InputGroup compact>
        <Input
          id="id"
          style={{ width: "30%" }}
          addonAfter="@"
          onChange={handleChangeId}
        />
        <Input
          id="address"
          style={{ width: "40%" }}
          onChange={handleChangeAddress}
        />
      </InputGroup>
      <div id="message"></div>
      <Button
        type="primary"
        onClick={handleClick}
        disabled={id.length && address.length ? false : true}
      >
        완료
      </Button>
    </div>
  );
};

export default FindId;

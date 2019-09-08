/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
const API_HOST_URL = process.env.REACT_APP_API_HOST_URL;

const Main = ({ history }) => {
  const redirect = () => {
    fetch(API_HOST_URL)
      .then(res => {
        if (res.session === undefined) {
          history.push("/login");
        } else {
          history.push("/pages/write");
        }
      })
      .then(res => console.log(res));
  };
  useEffect(redirect);
  return <div>loading..</div>;
};

export default Main;

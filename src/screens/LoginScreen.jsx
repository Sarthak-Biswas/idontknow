import React, { useEffect, useState } from "react";
import "./LoginScreen.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import "antd/dist/antd.css";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const gotoOverview = async () => {
    try {
      if (!username || !password) {
        return message.error("Please fill all the fields", 10);
      } else {
        const { data } = await axios.post(
          "https://d3e0ipw8ik.execute-api.ap-south-1.amazonaws.com/Prod/admin/loginAdmin",
          { username, password },
          { headers: { "Content-Type": "application/json" } }
        );

        localStorage.setItem("authToken", data.authToken);
        message.success("Login Successful");
        navigate("/overview");
      }
    } catch (err) {
      message.error("Invalid Credentials", 10);
    }
  };

  return (
    <>
      <div id="login__screen">
        <div id="login__form">
          <div id="login__top">
            <img src="/images/Logo.png" alt="" />
            <img src="/images/Apna Dukan.png" alt="" />
          </div>
          <div className="input">
            <img src="/images/Vector.svg" alt="" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <div className="input">
            <img src="/images/Vector-1.svg" alt="" />
            <input
              autoComplete="new-password"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="button__type4"
            onClick={() => gotoOverview()}
          >
            Log In
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;

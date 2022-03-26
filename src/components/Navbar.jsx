import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { message } from "antd";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    message.success("Logged out successfully");
  };

  return (
    <nav>
      <div id="nav__left">
        <img src="/images/Logo.png" alt="" />
        <img src="/images/Apna Dukan.png" alt="" />
      </div>
      <button onClick={() => logout()}>Logout</button>
    </nav>
  );
};

export default Navbar;

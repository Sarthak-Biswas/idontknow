import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    {
      name: "Overview",
      path: "/overview",
      iconPath: "/images/sidebar/Vector-6.svg",
    },
    {
      name: "All Products",
      path: "/products",
      iconPath: "/images/sidebar/Vector-1.svg",
    },
    {
      name: "All Orders",
      path: "/orders",
      iconPath: "/images/sidebar/Vector-2.svg",
    },
    {
      name: "All Users",
      path: "/users",
      iconPath: "/images/sidebar/Vector-3.svg",
    },

    {
      name: "All Coupons",
      path: "/coupons",
      iconPath: "/images/sidebar/Vector-5.svg",
    },
    {
      name: "All Categories",
      path: "/categories",
      iconPath: "/images/sidebar/Vector-6.svg",
    },
  ];

  return (
    <div id="sidebar">
      {links.map((link) => (
        <NavLink
          key={link.path}
          className={({ isActive }) => (isActive ? "link selected" : "link")}
          to={link.path}
          exact
        >
          <img src={link.iconPath} alt="" />
          {link.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;

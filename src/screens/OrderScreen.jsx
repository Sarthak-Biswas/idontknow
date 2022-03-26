import React, { useEffect, useState } from "react";
import "./OrderScreen.css";
import Orders from "../apis/Orders.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import "antd/dist/antd.css";
import Loading from "../components/Loading";

const OrderScreen = () => {
  const nav = useNavigate();
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);
  const [fifth, setFifth] = useState(false);
  const [sixth, setSixth] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordershow, setOrdershow] = useState([]);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        const { data } = await axios.post(
          "https://403f5xniz0.execute-api.ap-south-1.amazonaws.com/Prod/admin/viewallOrder",
          {},
          { headers: { authToken } }
        );

        setOrders(data);

        setOrdershow(data);
        setLoading(false);
      } catch (err) {
        message.error("There is some error");
      }
    };
    getAllOrders();
  }, []);

  const orderstoshow = (status, e) => {
    if (e.target.className === "first") {
      setFirst(true);
      setSecond(false);
      setThird(false);
      setFourth(false);
      setFifth(false);
      setSixth(false);
    }
    if (e.target.className === "second") {
      setFirst(false);
      setSecond(true);
      setThird(false);
      setFourth(false);
      setFifth(false);
      setSixth(false);
    }
    if (e.target.className === "third") {
      setFirst(false);
      setSecond(false);
      setThird(true);

      setFourth(false);
      setFifth(false);
      setSixth(false);
    }
    if (e.target.className === "fourth") {
      setFirst(false);

      setSecond(false);
      setThird(false);
      setFourth(true);
      setFifth(false);

      setSixth(false);
    }
    if (e.target.className === "fifth") {
      setFirst(false);
      setSecond(false);
      setThird(false);
      setFourth(false);
      setFifth(true);
      setSixth(false);
    }

    if (e.target.className === "sixth") {
      setFirst(false);
      setSecond(false);
      setThird(false);
      setFourth(false);
      setFifth(false);
      setSixth(true);
    }

    if (status === "AllOrders" || status === "") {
      setOrdershow(orders);
    } else {
      const orderstoshow = orders.filter((order) => order.status === status);
      setOrdershow(orderstoshow);
    }
  };

  return (
    <>
      {loading ? (
        Loading(<Loading />)
      ) : (
        <>
          <div className="pageContainer">
            <div className="pageContainerTop">
              <p className="pageHeading">All Orders</p>
            </div>
            <div className="line" />
            <table>
              <thead>
                <tr>
                  <td />
                  <td>Username</td>
                  <td>Order ID</td>
                  <td>Price(in Rs)</td>
                  <td>Status</td>
                  <td />
                </tr>
              </thead>
              <tbody>
                {ordershow.map((order) => (
                  <tr className="list" key={order.id}>
                    <div className="imagesize">
                      <td>
                        <img
                          src={order.picture}
                          alt=""
                          style={{
                            width: "100px",
                            height: "70px",
                            borderRadius: "10px",
                          }}
                        />
                      </td>
                    </div>
                    <td>{order.name}</td>
                    <td>{order.id}</td>
                    <td>{order.total}</td>
                    <td>{order.status}</td>
                    <td>
                      <button
                        className="btn__type1"
                        onClick={() => nav(`/order/${order.order_id}`)}
                      >
                        View / Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div id="screen__bottom">
              <div className="btngrp">
                <button
                  className="first"
                  onClick={(e) => orderstoshow("AllOrders", e)}
                  style={{
                    backgroundColor: first ? "#ffcc00" : "#ffffff",
                    color: first ? "#ffffff" : "#ffcc00",
                  }}
                >
                  All Orders
                </button>
                <button
                  className="second"
                  onClick={(e) => orderstoshow("Pending", e)}
                  style={{
                    backgroundColor: second ? "#ffcc00" : "#ffffff",
                    color: second ? "#ffffff" : "#ffcc00",
                  }}
                >
                  Pending
                </button>

                <button
                  className="third"
                  onClick={(e) => orderstoshow("Packing", e)}
                  style={{
                    backgroundColor: third ? "#ffcc00" : "#ffffff",
                    color: third ? "#ffffff" : "#ffcc00",
                  }}
                >
                  Packing
                </button>
                <button
                  className="fourth"
                  onClick={(e) => orderstoshow("OutforDelivery", e)}
                  style={{
                    backgroundColor: fourth ? "#ffcc00" : "#ffffff",
                    color: fourth ? "#ffffff" : "#ffcc00",
                  }}
                >
                  Out For Delivery
                </button>
                <button
                  className="fifth"
                  onClick={(e) => orderstoshow("Delivered", e)}
                  style={{
                    backgroundColor: fifth ? "#ffcc00" : "#ffffff",
                    color: fifth ? "#ffffff" : "#ffcc00",
                  }}
                >
                  Delivered
                </button>
                <button
                  className="sixth"
                  onClick={(e) => orderstoshow("Cancelled", e)}
                  style={{
                    backgroundColor: sixth ? "#ffcc00" : "#ffffff",
                    color: sixth ? "#ffffff" : "#ffcc00",
                  }}
                >
                  Cancelled
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderScreen;

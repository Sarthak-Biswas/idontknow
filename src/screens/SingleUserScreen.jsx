import React, { useState, useEffect } from "react";
// import Users from "../apis/Users.json";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
import { message } from "antd";
import "antd/dist/antd.css";

const SingleUserScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [orderhistory, setOrderhistory] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        console.log({ id: Number(id) });
        const authToken = localStorage.getItem("authToken");

        const { data } = await axios.post(
          "https://yedqovxqw4.execute-api.ap-south-1.amazonaws.com/Prod/admin/showUser",
          { id: Number(id) },
          { headers: { authToken } }
        );

        setUser(data);
        setOrderhistory(data.slice(1));

        setLoading(false);
      } catch (err) {
        console.log(err);
        message.error("There is some error");
      }
    };
    getUser();
  }, [id]);
  const lockuser = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await axios.post(
        "https://yedqovxqw4.execute-api.ap-south-1.amazonaws.com/Prod/admin/showUser",
        { id: Number(id) },
        { headers: { authToken } }
      );
      message.success("User Locked");
      navigate("/users");
    } catch (err) {
      message.error("There is some error");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <div className="pageContainer">
            <div className="pageContainerTop">
              <p className="pageHeading">{user[0].name}</p>
              <button
                className="btn_type3"
                style={{ backgroundColor: "#F33535" }}
                onClick={() => lockuser()}
              >
                Lock User
              </button>
            </div>
            <div className="line" />

            <div className="scroll__container">
              <div
                id="photoContainer"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={user[0].picture}
                  alt=""
                  style={{ width: "400px", height: "auto", marginLeft: "30px" }}
                />
              </div>

              <div className="editForm">
                <div className="editField">
                  <p>Name</p>

                  <div>{user[0].name}</div>
                </div>
                <div className="editField">
                  <p>Contact</p>

                  <div>{user[0].phone}</div>
                </div>
                <div className="editField">
                  <p>Address</p>

                  <div>{user[0].address}</div>
                </div>
                <div className="editField">
                  <p>Total Transaction</p>

                  <div>{user[0].total_transaction}</div>
                </div>

                <div className="editField">
                  <p>Order History</p>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",

                        width: "100%",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <span>Order Id</span>
                      <span>Date & Time</span>
                    </div>
                    {orderhistory.map((order) => (
                      <div
                        style={{
                          display: "flex",

                          width: "100%",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <span>{order.order_id}</span>
                        <span>{order.create_date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleUserScreen;

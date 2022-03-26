import React, { useEffect, useState } from "react";
import "./AllUsersScreen.css";
import Users from "../apis/Users.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import "antd/dist/antd.css";
import Loading from "../components/Loading";

const AllUsersScreen = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        const { data } = await axios.post(
          "https://o3kifngnt7.execute-api.ap-south-1.amazonaws.com/Prod/admin/viewUsers",
          {},
          { headers: { authToken } }
        );

        setUsers(data);
        setLoading(false);
      } catch (err) {
        message.error("There is some error");
      }
    };
    getAllUsers();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="pageContainer">
            <div className="pageContainerTop">
              <p className="pageHeading">All Users</p>
            </div>
            <div className="line" />
            <table>
              <thead>
                <tr>
                  <td />
                  <td>Username</td>
                  <td>Total Transaction</td>
                  <td>Phone</td>
                  <td>Address</td>
                  <td />
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr className="list" key={user.id}>
                    <div
                      className="imagesize"
                      style={{ marginBottom: "5px", marginTop: "5px" }}
                    >
                      <td>
                        <img
                          src={user.picture}
                          alt=""
                          style={{
                            width: "100px",
                            height: "70px",
                            borderRadius: "10px",
                          }}
                        />
                      </td>
                    </div>
                    <td>{user.name}</td>
                    <td>{user.total_transaction}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>
                      <button
                        className="btn__type1"
                        onClick={() => navigate(`/user/${user.id}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div id="screen__bottom">
              <div></div>
              <div className="bottom__left"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllUsersScreen;

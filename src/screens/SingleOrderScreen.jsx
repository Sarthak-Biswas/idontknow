import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
import { message } from "antd";
import "antd/dist/antd.css";

const SingleOrderScreen = () => {
  const navigate = useNavigate();
  const { order_id } = useParams();

  const [loading, setLoading] = useState(true);

  const [tracking_id, setTrackingId] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [user, setUser] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        const { data } = await axios.post(
          "https://odqtj7h43g.execute-api.ap-south-1.amazonaws.com/Prod/admin/viewOrder",
          { order_id: order_id },
          { headers: { authToken } }
        );

        const orderdetails = data.slice(0, data.length - 1);
        setOrders(orderdetails);
        const orderuser = data.slice(data.length - 1);
        setUser(orderuser);
        setNewStatus(data[0].status);
        console.log(orders);
        setTrackingId(data[0].tracking_id);
        // setTotalprice(
        //   orders.reduce(
        //     (total, currentValue) =>
        //       (total = total + currentValue.total * currentValue.quantity),
        //     0
        //   )
        // );
        setLoading(false);
      } catch (err) {
        console.log(err);
        message.error("There is some error here");
      }
    };
    getOrder();
  }, [order_id]);

  const updateOrder = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await axios.post(
        "https://7xxsn5qd39.execute-api.ap-south-1.amazonaws.com/Prod/admin/editOrder",
        {
          order_id: order_id,
          status: newStatus,
          tracking_id: tracking_id,
        },
        { headers: { authToken } }
      );
      message.success("Order updated successfully");
      navigate("/orders");
    } catch (err) {
      message.error("There is some error");
    }
  };

  const cancelOrder = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await axios.post(
        "https://7xxsn5qd39.execute-api.ap-south-1.amazonaws.com/Prod/admin/editOrder",
        {
          order_id: order_id,
          status: "Cancelled",
          tracking_id: tracking_id,
        },
        { headers: { authToken } }
      );
      message.success("Order cancelled successfully");
      navigate("/orders");
    } catch (err) {
      message.error("There is some error");
    }
  };

  // console.log("tp", totalprice);

  let total = 0;

  for (var i = 0; i < orders.length; i++) {
    total = total + orders[i].total * orders[i].quantity;
  }

  console.log("total", total);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="pageContainer">
            <div className="pageContainerTop">
              <p className="pageHeading">{orders[0].order_id}</p>
              <button
                className="btn_type3"
                style={{ backgroundColor: "#F33535" }}
                onClick={(e) => cancelOrder(e)}
              >
                Cancel Order
              </button>
            </div>
            <div className="line" />
            <div className="scroll__container">
              <div className="editForm">
                <div className="editField">
                  <p>Order Status</p>
                  <div className="radio">
                    <div>
                      <input
                        type="radio"
                        value="Pending"
                        id="Pending"
                        name="orderstatus"
                        checked={newStatus === "Pending"}
                        onClick={() => setNewStatus("Pending")}
                      />
                      <label htmlFor="1">Pending</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        value="Packing"
                        id="Packing"
                        name="orderstatus"
                        checked={newStatus === "Packing"}
                        onClick={() => setNewStatus("Packing")}
                      />
                      <label htmlFor="2">Packing</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        value="OutforDelivery"
                        id="OutforDelivery"
                        name="orderstatus"
                        checked={newStatus === "OutforDelivery"}
                        onClick={() => setNewStatus("OutforDelivery")}
                      />
                      <label htmlFor="3">Out For Delivery</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        value="Delivered"
                        id="Delivered"
                        name="orderstatus"
                        checked={newStatus === "Delivered"}
                        onClick={() => setNewStatus("Delivered")}
                      />
                      <label htmlFor="3">Delivered</label>
                    </div>
                  </div>
                </div>
                <div className="editField">
                  <p>Order By</p>
                  <div style={{ padding: "15px" }}>
                    <img
                      src={user[0].user_picture}
                      alt=""
                      style={{
                        width: "100px",
                        height: "70px",
                        borderRadius: "5px",
                        marginRight: "20px",
                      }}
                    />
                    <span style={{ fontSize: "17px" }}>
                      {" "}
                      {user[0].user_name}
                    </span>
                  </div>
                </div>

                <div className="editField">
                  <p>Delivery Address</p>
                  <textarea name="desc" value={orders[0].address} disabled />
                </div>
                <div className="editField">
                  <p>Total Price (in Rs)</p>
                  <input type="text" value={total} disabled />
                </div>
                <div className="editField">
                  <p>Payment Mode</p>
                  <input type="text" value={orders[0].payment_mode} disabled />
                </div>
                <div className="editField">
                  <p>Date & Time</p>

                  <div>
                    {orders[0].create_date.slice(0, 10)}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {orders[0].create_date.slice(10)}
                  </div>
                </div>

                <div className="editField">
                  <p>Tracking ID</p>
                  <input
                    type="text"
                    value={tracking_id}
                    onChange={(e) => setTrackingId(e.target.value)}
                  />
                </div>
                <div className="editField">
                  <p>Product Ordered</p>

                  <div
                    style={{
                      padding: "15px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      // alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: "100px" }}> Product Image</div>
                      <div
                        style={{
                          width: "30%",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        Product Name
                      </div>
                      <div
                        style={{
                          width: "20%",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        Quantity
                      </div>
                      <div
                        style={{
                          width: "20%",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        Product Price
                      </div>
                    </div>
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        style={{
                          marginBottom: "5px",
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={order.product_image}
                          alt=""
                          style={{
                            width: "100px",
                            height: "70px",
                            borderRadius: "5px",
                            // marginRight: "20px",
                          }}
                        />
                        <div
                          style={{
                            fontSize: "15px",
                            width: "30%",

                            textAlign: "center",
                          }}
                        >
                          {" "}
                          {order.name}
                        </div>
                        <div
                          style={{
                            width: "20%",
                            fontSize: "15px",

                            textAlign: "center",
                          }}
                        >
                          {" "}
                          {order.quantity}
                        </div>
                        <div
                          style={{
                            fontSize: "15px",

                            width: "20%",
                            textAlign: "center",
                          }}
                        >
                          {" "}
                          {order.total}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className="btn_type3"
                  style={{
                    backgroundColor: "#18134C",
                    margin: "0 auto 0 auto",
                  }}
                  onClick={(e) => updateOrder(e)}
                >
                  Save Changes
                </button>
              </div>
            </div>
            <div id="screen__bottom">
              <div className="bottom__left"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleOrderScreen;
